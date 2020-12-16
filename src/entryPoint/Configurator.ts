import { EditorConfigModifiersInterface } from "../primitives/Editor/types";

class AppEntryConfigurator {
  editorConfigModifiers: EditorConfigModifiersInterface[] = [];

  setPrimitiveEditorAvailableDecorators(configModifiers: EditorConfigModifiersInterface[]) {
    this.editorConfigModifiers = configModifiers;
  }
}

export default new AppEntryConfigurator();
