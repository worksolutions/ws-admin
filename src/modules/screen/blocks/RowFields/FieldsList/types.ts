import { BlockInterface } from "state/systemState";

export enum FieldListItemMode {
  HORIZONTAL = "HORIZONTAL",
  VERTICAL = "VERTICAL",
}

export enum FieldListItemType {
  text = "text",
  image = "image",
}

export interface FieldListItemInterface {
  title: string;
  type: FieldListItemType;
  options: Record<string, any>;
}

export type FieldListInterface = {
  mode?: FieldListItemMode;
  fields: FieldListItemInterface[];
};

export type FieldListComponentInterface = BlockInterface<FieldListInterface> & {
  forceTitleWidth?: number;
  onCalculateTitleWidth?: (width: number) => void;
};
