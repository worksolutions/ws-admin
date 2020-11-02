import { Aligns } from "libs/styles";

import { FieldListInterface } from "./FieldsList/types";

import { BlockInterface } from "state/globalState";

export type GroupedFieldsListInterface = BlockInterface<{ title: string; fieldList: FieldListInterface }[]>;

export interface InternalGroupedFieldsListInterface extends GroupedFieldsListInterface {
  isEditable: boolean;
}

export interface AlignFieldsRowConfigInterface {
  vertical?: {
    alignFieldRow?: Aligns;
    titleStyles?: any;
    elementStyles?: any;
  };
  horizontal?: {
    alignFieldRow?: Aligns;
    titleStyles?: any;
    elementStyles?: any;
  };
}
