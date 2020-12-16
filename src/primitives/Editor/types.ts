export interface EditorConfigModifiersInterface {
  type: EditorConfigModifiers;
  payload: EditorDecoratorPayload[];
}

export interface EditorDecoratorPayload {
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
