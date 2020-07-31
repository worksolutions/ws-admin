import { InputOptionsInterface } from "modules/screen/blocks/Actions/Input";
import { SortingOptionsInterface } from "modules/screen/blocks/Actions/Sorting";

import { CardsViewInterface } from "../Cards/types";
import { TableViewBlockInterface } from "../Table";

import { BlockInterface } from "state/systemState";

interface CardsViewConfigInterface extends CardsViewInterface {
  options?: CardsViewInterface["options"] & {
    sortingOptions?: SortingOptionsInterface;
  };
}

export interface TableViewConfigInterface extends TableViewBlockInterface {}

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
