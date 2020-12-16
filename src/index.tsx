import configurator from "./entryPoint/entryPoint";
import { EditorConfigModifiers } from "./primitives/Editor/types";

configurator.setPrimitiveEditorAvailableDecorators([
  {
    type: EditorConfigModifiers.link,
    payload: [
      {
        callback: (url: string) => url.startsWith("http"),
        attributes: {},
      },
      {
        callback: (url: string) => new URL(url).hostname !== "worksolutions.ru",
        attributes: {
          target: "_blank",
          rel: "nofollow noopener noreferrer",
        },
      },
    ],
  },
]);
