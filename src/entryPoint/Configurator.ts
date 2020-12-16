import { EditorConfigModifiersType } from "../primitives/Editor/types";

class AppEntryConfigurator {
  editorConfigModifiers: EditorConfigModifiersType[] = [];

  setEditorConfigModifiers(configModifiers: EditorConfigModifiersType[]) {
    this.editorConfigModifiers = configModifiers;
  }
}

export default new AppEntryConfigurator();
