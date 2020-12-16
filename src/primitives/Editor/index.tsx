import React, { ReactNode, Suspense } from "react";
import ReactDOM from "react-dom";

import Spinner from "primitives/Spinner";

import { config } from "./config";
import {
  getDivElementAtTheEndOfEditorToolbar,
  getDivElementBeforeEditorToolbarSeparator,
  prepareEditorToCustomize,
} from "./libs";

import { EditorConfigModifiers, EditorConfigModifiersInterface, EditorDecoratorPayload } from "./types";

interface EditorInterface {
  initialText?: string | null;
  configModifiers: EditorConfigModifiersInterface[];
  onChange: (text: string) => void;
  uploader: (file: File) => Promise<any>;
  onInit?: (ref: EditorRefInterface) => void;
  additionalToolbarElements?: {
    beforeLastSeparator?: ReactNode;
    atTheEndOfContainer?: ReactNode;
  };
}

export interface EditorRefInterface {
  insertContent: (text: string, appendNewLines?: boolean) => void;
}

const CKEditor5 = React.lazy(() => {
  // @ts-ignore
  import("edelgarat-ckeditor5-custom-build/build/translations/ru");
  return Promise.all([
    import("!!raw-loader!edelgarat-ckeditor5-custom-build/build/ckeditor"),
    // @ts-ignore
    import("@ckeditor/ckeditor5-react"),
  ]).then(([editor, ReactEditor]) => {
    eval(editor.default);
    const { ClassicEditor } = window as any;
    return {
      default: (props: any) => <ReactEditor.default {...props} editor={ClassicEditor} />,
    };
  });
});

const configEditorMap = {
  [EditorConfigModifiers.link]: (configClone: any, payloadDecorators: EditorDecoratorPayload[]) => {
    payloadDecorators.forEach((payload: any, index: any) => {
      configClone.link.decorators = {
        ...configClone.link.decorators,
        [`decorator${index}`]: { ...payload, mode: "automatic" },
      };
    });
    return configClone;
  },
};

export default React.memo(function Editor({
  initialText,
  configModifiers,
  uploader,
  onChange,
  onInit,
  additionalToolbarElements,
}: EditorInterface) {
  const [toolbarContainer, setToolbarContainer] = React.useState<HTMLElement | null>(null);
  const [lastToolbarSeparator, setLastToolbarSeparator] = React.useState<HTMLElement | null>(null);

  function modifyEditorConfig(config: object) {
    if (!configModifiers) return config;
    const configClone = Object.assign({}, config);
    configModifiers.forEach((configModifier) => {
      configEditorMap[configModifier.type](configClone, configModifier.payload);
    });

    return configClone;
  }

  function init(editor: any) {
    prepareEditorToCustomize();
    setToolbarContainer(getDivElementAtTheEndOfEditorToolbar());
    setLastToolbarSeparator(getDivElementBeforeEditorToolbarSeparator());
    editor.ui.view.toolbar.element.style.top = `0px`;
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => new CK5UploadAdapter(loader, uploader);
    editor.model.document.on("change:data", () => {
      onChange(editor.getData());
    });

    if (onInit)
      onInit({
        insertContent: (text, appendNewLines = false) => {
          editor.model.change((writer: any) => {
            const insertPosition = editor.model.document.selection.getFirstPosition();
            if (appendNewLines) {
              const content = `<p></p>${text}<p></p>`;
              const viewFragment = editor.data.processor.toView(content);
              const modelFragment = editor.data.toModel(viewFragment);
              editor.model.insertContent(modelFragment, insertPosition);
              return;
            }
            writer.insertText(text, insertPosition);
          });
        },
      });
  }
  return (
    <Suspense fallback={<Spinner />}>
      <CKEditor5 data={initialText} config={modifyEditorConfig(config)} onInit={init} />
      {toolbarContainer && ReactDOM.createPortal(additionalToolbarElements?.atTheEndOfContainer, toolbarContainer)}
      {lastToolbarSeparator &&
        ReactDOM.createPortal(additionalToolbarElements?.beforeLastSeparator, lastToolbarSeparator)}
    </Suspense>
  );
});

class CK5UploadAdapter {
  constructor(private loader: any, private uploader: EditorInterface["uploader"]) {}

  upload() {
    return this.loader.file.then(async (file: File) => {
      const { path } = await this.uploader(file);
      return { default: path };
    });
  }

  abort() {
    if (!this.loader.file) return;
  }
}
