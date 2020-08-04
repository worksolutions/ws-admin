import { BlockInterface } from "state/globalState";

export enum FieldListItemMode {
  HORIZONTAL = "HORIZONTAL",
  VERTICAL = "VERTICAL",
}

export enum FieldListItemType {
  text = "text",
  image = "image",
  iconLink = "icon-link",
  link = "link",
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
  useTitleWidthCalculation: boolean;
  styles?: any;
  forceTitleWidth?: number;
  onCalculateTitleWidth?: (width: number) => void;
};
