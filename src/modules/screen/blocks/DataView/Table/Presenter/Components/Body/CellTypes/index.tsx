import { TableViewDataType } from "../../../types";
import { CellComponentData } from "../types";

import { cellComponent as cellStringComponent } from "./string";
import { cellComponent as cellDateComponent } from "./date";
import { cellComponent as cellStatusComponent } from "./status";
import { cellComponent as cellImageComponent } from "./image";
import { cellComponent as cellActionComponent } from "./actions";
import { cellComponent as cellUserComponent } from "./user";

export const getComponentForColumnType: Record<TableViewDataType, CellComponentData> = {
  [TableViewDataType.STRING]: cellStringComponent,
  [TableViewDataType.DATE]: cellDateComponent,
  [TableViewDataType["STATUS-STRING"]]: cellStatusComponent,
  [TableViewDataType.IMAGE]: cellImageComponent,
  [TableViewDataType.ACTIONS]: cellActionComponent,
  [TableViewDataType.USER]: cellUserComponent,
};
