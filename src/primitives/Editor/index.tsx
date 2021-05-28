import React, { ReactNode, Suspense } from "react";
import ReactDOM from "react-dom";

import Spinner from "primitives/Spinner";

import { config } from "./config";
import {
  getDivElementAtTheEndOfEditorToolbar,
  getDivElementBeforeEditorToolbarSeparator,
  prepareEditorToCustomize,
} from "./libs";

import { EditorConfigModifiers, EditorConfigModifiersType, EditorLinkDecoratorInterface } from "./types";
import { assocPath } from "ramda";

interface EditorInterface {
  initialText?: string | null;
  configModifiers: EditorConfigModifiersType[];
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
  import("@worksolutions/ckeditor5/build/translations/ru.js");
  return Promise.all([
    import("!!raw-loader!@worksolutions/ckeditor5/build/ckeditor"),
    // @ts-ignore
    import("@ckeditor/ckeditor5-react"),
    // @ts-ignore
  ]).then(([editor, ReactCkeditor]) => {
    eval(editor.default);
    const { CKSource } = window as any;
    const ReactEditor = ReactCkeditor.CKEditor;
    return {
      default: (props: any) => <ReactEditor {...props} editor={CKSource.Editor} />,
    };
  });
});

const editorConfigModifiersMap = {
  [EditorConfigModifiers.link]: (config: any, payloadDecorators: EditorLinkDecoratorInterface[]) => {
    let newConfig = config;
    payloadDecorators.forEach((payload, index) => {
      newConfig = assocPath(["link", "decorators", `decorator${index}`], { ...payload, mode: "automatic" }, newConfig);
    });

    return newConfig;
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
  const [newConfig] = React.useState(() => modifyEditorConfig(config));

  function modifyEditorConfig(config: object) {
    if (!configModifiers) return config;
    let newConfig = config;
    configModifiers.forEach((configModifier) => {
      newConfig = editorConfigModifiersMap[configModifier.type](newConfig, configModifier.modifierPayload);
    });

    return newConfig;
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
      <CKEditor5 data={initialText} config={newConfig} onReady={init} />
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
