import { InputOptionsInterface } from "modules/screen/blocks/Actions/Input";
import { SortingOptionsInterface } from "modules/screen/blocks/Actions/Sorting";

import { TableViewBlockInterface } from "../Table";
import { CardsViewBlockInterface } from "../Cards";

import { BlockInterface } from "state/systemState";

interface CardsViewInterface extends CardsViewBlockInterface {
  options?: CardsViewBlockInterface["options"] & {
    sortingOptions?: SortingOptionsInterface;
  };
}

export interface TableViewInterface extends TableViewBlockInterface {}

export type FormattedDataPaginationView = BlockInterface<{ paginationItems: number[] }, "change">;

export type FormattedDataViewInterface = BlockInterface<
  {
    id: string;
    tableView: TableViewInterface;
    cardsView: CardsViewInterface;
    paginationView: FormattedDataPaginationView;
    searchOptions: InputOptionsInterface;
  },
  "search" | "sorting"
> & { styles?: any };
