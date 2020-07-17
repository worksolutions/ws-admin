import { CardActionInterface, CardInterface } from "primitives/Card/types";

import { AnyAction } from "types/Actions";
import { PaginationMeta } from "types/Pagination";

export interface CardsViewDataSource {
  pagination: PaginationMeta;
  list: (Omit<CardInterface, "actions"> & {
    actions?: (Omit<CardActionInterface, "handler"> & { action: AnyAction })[];
  })[];
}
