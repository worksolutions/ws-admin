export type EditorConfigModifiersType = {
  type: EditorConfigModifiers.link;
  modifierPayload: EditorLinkDecoratorInterface[];
};

export interface EditorLinkDecoratorInterface {
  callback: (url: string) => boolean;
  attributes: {
    rel?: string;
    target?: string;
    download?: string;
  };
}

export enum EditorConfigModifiers {
  link = "link",
}
