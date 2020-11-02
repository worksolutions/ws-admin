import { Aligns, paddingTop } from "libs/styles";

import { AlignFieldsRowConfigInterface } from "../types";

export const alignConfigEditable: AlignFieldsRowConfigInterface = {
  vertical: {
    alignFieldRow: Aligns.START,
    titleStyles: paddingTop(10),
  },
  horizontal: {
    alignFieldRow: Aligns.START,
  },
};

export const alignConfigNotEditable: AlignFieldsRowConfigInterface = {
  vertical: {
    alignFieldRow: Aligns.CENTER,
    titleStyles: paddingTop(0),
  },
  horizontal: {
    alignFieldRow: Aligns.START,
  },
};
