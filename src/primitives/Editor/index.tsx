import React, { Suspense } from "react";
import "edelgarat-ckeditor5-custom-build/build/translations/ru";
import ReactEditor from "@ckeditor/ckeditor5-react";
import editor from "edelgarat-ckeditor5-custom-build/build/ckeditor";

import Spinner from "primitives/Spinner";

import { config } from "./config";

// @ts-ignore

// @ts-ignore

interface EditorInterface {
  initialText: string;
  onChange: (text: string) => void;
  uploader: (file: File) => Promise<any>;
  onInit?: (ref: EditorRefInterface) => void;
}

export interface EditorRefInterface {
  insertContent: (text: string, appendNewLines?: boolean) => void;
}

export default React.memo(function Editor({ initialText, uploader, onChange, onInit }: EditorInterface) {
  function init(editor: any) {
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
      <ReactEditor data={initialText} editor={editor} config={config} onChange={onChange} onInit={init} />
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
