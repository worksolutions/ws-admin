import { AlignFieldsRowConfigInterface } from "../types";

import { BlockInterface } from "state/globalState";

export enum FieldListItemMode {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

export enum FieldListItemType {
  text = "text",
  image = "image",
  iconLink = "icon-link",
  link = "link",
  "edit:RadioGroup" = "edit:RadioGroup",
  "edit:Date" = "edit:Date",
  "edit:Text" = "edit:Text",
  "edit:Password" = "edit:Password",
  "edit:Dropdown" = "edit:Dropdown",
  "edit:Tokens" = "edit:Tokens",
  "edit:Image" = "edit:Image",
  "edit:Avatar" = "edit:Avatar",
  "edit:Checkbox" = "edit:Checkbox",
}

export enum FieldListItemModifierType {
  TOGGLE = "toggle",
}

export interface FieldListItemModifierInterface {
  type: FieldListItemModifierType;
  title: string;
  contextPath: string;
}

export interface FieldListItemInterface {
  required?: boolean;
  hint?: string;
  title?: string;
  type: FieldListItemType;
  options: Record<string, any>;
  modifier?: FieldListItemModifierInterface;
}

export type FieldListInterface = {
  mode?: FieldListItemMode;
  fields: FieldListItemInterface[];
};

export type FieldListComponentInterface = BlockInterface<FieldListInterface> & {
  useTitleWidthCalculation: boolean;
  styles?: any;
  alignConfig?: AlignFieldsRowConfigInterface;
  forceTitleWidth?: number;
  onCalculateTitleWidth?: (width: number) => void;
};
