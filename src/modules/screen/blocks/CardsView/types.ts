import { CardImageConfig, CardInterface } from "primitives/Card/types";

import { Pagination } from "types/Pagination";

export interface CardsViewDataSource {
  pagination: Pagination;
  list: CardInterface[];
}
