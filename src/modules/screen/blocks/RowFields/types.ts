import { Aligns } from "libs/styles";

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
