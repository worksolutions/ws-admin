import { InputOptionsInterface } from "modules/screen/blocks/Actions/Input";
import { SortingOptionsInterface } from "modules/screen/blocks/Actions/Sorting";

import { CardsViewInterface } from "../Cards/types";
import { TableViewInterface } from "../Table/types";

import { BlockInterface } from "state/systemState";

export interface CardsViewConfigInterface extends CardsViewInterface {
  options?: CardsViewInterface["options"] & {
    sortingOptions?: SortingOptionsInterface;
  };
}

export interface TableViewConfigInterface extends TableViewInterface {}

export type FormattedDataViewPagination = BlockInterface<{ paginationItems: number[] }, "change">;

export type FormattedDataViewInterface = BlockInterface<
  {
    id: string;
    tableView: TableViewConfigInterface;
    cardsView: CardsViewConfigInterface;
    paginationView: FormattedDataViewPagination;
    searchOptions: InputOptionsInterface;
  },
  "search" | "sorting"
> & { styles?: any };
