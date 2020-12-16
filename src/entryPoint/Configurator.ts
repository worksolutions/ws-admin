class AppEntryConfigurator {
  primitiveEditorAvailableDecorators: EditorDecorator[] = [];

  setPrimitiveEditorAvailableDecorators(availableDecorators: EditorDecorator[]) {
    this.primitiveEditorAvailableDecorators = availableDecorators;
  }
}

export default new AppEntryConfigurator();

interface EditorDecorator {
  type: "link";
  payload: [
    {
      needApply: (url) => true;
      attributes: {
        rel: "df";
      };
    },
  ];
}
