import { CardActionInterface, CardInterface } from "primitives/Card/types";

import { AnyAction } from "types/Actions";
import { Pagination } from "types/Pagination";

export interface CardsViewDataSource {
  pagination: Pagination;
  list: (Omit<CardInterface, "actions"> & {
    actions?: (Omit<CardActionInterface, "handler"> & { action: AnyAction })[];
  })[];
}
