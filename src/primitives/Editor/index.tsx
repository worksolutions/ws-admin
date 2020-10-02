import React, { ReactNode, Suspense } from "react";
import ReactDOM from "react-dom";

import Spinner from "primitives/Spinner";

import { config } from "./config";
import {
  insertDivElementAtTheEndOfEditorToolbar,
  insertDivElementBeforeEditorToolbarSeparator,
  prepareEditorToCustomize,
} from "./libs";

interface EditorInterface {
  initialText: string;
  onChange: (text: string) => void;
  uploader: (file: File) => Promise<any>;
  onInit?: (ref: EditorRefInterface) => void;
  additionalToolbarElements?: {
    beforeLastSeparator?: ReactNode;
    atTheEndOfContainer?: ReactNode;
  };
  disabled: boolean;
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

export default React.memo(function Editor({
  initialText,
  uploader,
  onChange,
  onInit,
  additionalToolbarElements,
  disabled,
}: EditorInterface) {
  const [toolbarContainer, setToolbarContainer] = React.useState<HTMLElement | null>(null);
  const [lastToolbarSeparator, setLastToolbarSeparator] = React.useState<HTMLElement | null>(null);

  function init(editor: any) {
    prepareEditorToCustomize();
    setToolbarContainer(insertDivElementAtTheEndOfEditorToolbar());
    setLastToolbarSeparator(insertDivElementBeforeEditorToolbarSeparator());
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
      <CKEditor5 disabled={disabled} data={initialText} config={config} onInit={init} />
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
      const { link } = await this.uploader(file);
      return { default: link };
    });
  }

  abort() {
    if (!this.loader.file) return;
  }
}

export function parseEditorViewContent() {
  setTimeout(() => {
    document.querySelectorAll("oembed[url]").forEach((element) => {
      const anchor = document.createElement("a");
      anchor.setAttribute("href", element.getAttribute("url")!);
      anchor.className = "embedly-card";
      element.appendChild(anchor);
    });
  }, 100);

  setTimeout(() => {
    const frames = document.querySelectorAll(".embedly-card iframe");
    Array.prototype.forEach.call(frames, (frame) => {
      const iframeContent = frame.contentDocument;
      iframeContent.body.innerHTML = iframeContent.body.innerHTML + "<style>.hdr, .brd{display: none;}</style>";
    });
  }, 500);
}
