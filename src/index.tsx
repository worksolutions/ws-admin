import configurator from "./entryPoint/entryPoint";
import { EditorConfigModifiers } from "./primitives/Editor/types";

configurator.setEditorConfigModifiers([
  {
    type: EditorConfigModifiers.link,
    modifierPayload: [
      {
        callback: (url) => {
          try {
            return !(new URL(url).hostname === "worksolutions.ru");
          } catch (e) {
            return false;
          }
        },
        attributes: {
          target: "_blank",
          rel: "nofollow noopener noreferrer",
        },
      },
    ],
  },
]);
