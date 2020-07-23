import React from "react";
import { observer } from "mobx-react-lite";
import { assoc, assocPath } from "ramda";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import Dropdown, { DropdownSize } from "primitives/Dropdown";
import Spinner from "primitives/Spinner";

import Pagination from "components/Pagination/Pagination";

import {
  ai,
  Aligns,
  border,
  borderRadius,
  borderTop,
  child,
  flex,
  flexColumn,
  flexValue,
  flexWrap,
  fullWidth,
  jc,
  lastChild,
  marginLeft,
  marginRight,
  marginTop,
  overflowX,
  overflowY,
  padding,
  zIndex,
} from "libs/styles";
import { useLocalStorage } from "libs/hooks";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useDataSource } from "modules/context/dataSource/useDataSource";

import ActionInput, { InputOptionsInterface } from "../../Actions/Input";
import ActionSorting, { SortingOptionsInterface } from "../../Actions/Sorting";
import TableViewBlock, { TableViewBlockInterface } from "../Table";
import CardsViewBlock, { CardsViewBlockInterface } from "../Cards";
import { ViewMetaData } from "../types";

import { BlockInterface } from "state/systemState";

import { PaginationInterface } from "types/Pagination";

export const initialLocalStorageValue = { mode: "cards", perPage: 0 };

const initialMetaData: ViewMetaData = {
  pagination: { itemsCount: 0, pagesCount: 0 },
};

interface CardsViewInterface extends CardsViewBlockInterface {
  options?: CardsViewBlockInterface["options"] & {
    sortingOptions?: SortingOptionsInterface;
  };
}

export interface TableViewInterface extends TableViewBlockInterface {}

export type FormattedDataViewInterface = BlockInterface<
  {
    id: string;
    tableView: TableViewInterface;
    cardsView: CardsViewInterface;
    paginationView: BlockInterface<{ enabled: boolean; paginationItems: number[] }, "change">;
    searchOptions: InputOptionsInterface;
  },
  "search" | "sorting"
> & { styles?: any };

function FormattedDataView({ options, actions, styles }: FormattedDataViewInterface) {
  const paginationEnabled = options?.paginationView.options?.enabled;

  const [storage, setStorage] = useLocalStorage(options!.id, initialLocalStorageValue);

  const [metaData, setMetaData] = React.useState(initialMetaData);
  const paginationViewData = useDataSource<PaginationInterface>(options!.paginationView.dataSource!);

  const appContext = useAppContext();
  const paginationViewActions = useActions(options?.paginationView.actions!, appContext);

  const tableViewOptions = React.useMemo(
    () => assocPath(["options", "id"], `${options!.id}-table`, options!.tableView),
    [],
  );

  if (paginationViewData.loadingContainer.loading) return <Spinner size={36} />;

  const isCardsView = storage.mode === "cards";

  return (
    <Wrapper
      styles={[flex, ai(Aligns.STRETCH), flexValue(1), borderRadius(8), border(1, "gray-blue/02"), flexColumn, styles]}
    >
      <Wrapper
        styles={[
          padding("16px 16px 0 16px"),
          flex,
          ai(Aligns.CENTER),
          flexWrap,
          zIndex(1),
          child(marginRight(16)),
          lastChild(marginRight(0)),
        ]}
      >
        {actions?.search && <ActionInput actions={{ change: actions.search }} options={options?.searchOptions} />}
        {isCardsView && actions?.sorting && (
          <ActionSorting
            styles={[actions?.search && marginLeft(8)]}
            actions={{ change: actions.sorting }}
            options={options?.cardsView.options?.sortingOptions}
          />
        )}
        <Wrapper styles={flexValue(1)} />
        {paginationEnabled && (
          <Dropdown
            size={DropdownSize.MEDIUM}
            items={options!.paginationView.options?.paginationItems.map((number) => ({ id: number, title: number }))}
            selectedItemId={paginationViewData.data!.perPage}
            onChange={async (value) => {
              await paginationViewActions.change.run({
                page: 1,
                perPage: value,
              });
              setStorage({ ...storage, perPage: value as number });
            }}
          />
        )}
        <Button
          type={ButtonType.ICON}
          size={ButtonSize.MEDIUM}
          iconLeft={isCardsView ? "density-high" : "dashboard"}
          onClick={() => setStorage({ ...storage, mode: isCardsView ? "table" : "cards" })}
        />
      </Wrapper>
      {isCardsView ? (
        <Wrapper styles={[fullWidth, marginTop(20), flexValue(1), overflowY("scroll")]}>
          <CardsViewBlock {...options!.cardsView} onUpdateMeta={setMetaData} />
        </Wrapper>
      ) : (
        <Wrapper styles={[fullWidth, marginTop(8), flex, overflowX("auto"), flexValue(1)]}>
          <TableViewBlock {...tableViewOptions} onUpdateMeta={setMetaData} />
        </Wrapper>
      )}
      {paginationEnabled && paginationViewData.data && paginationViewActions.change && (
        <Wrapper styles={[flex, jc(Aligns.END), padding(16), borderTop(1, "gray-blue/02")]}>
          <Pagination
            perPage={paginationViewData.data.perPage}
            elementsCount={metaData.pagination.itemsCount}
            onChange={(page) => {
              paginationViewActions.change.run(assoc("page", page, paginationViewData.data!));
            }}
          />
        </Wrapper>
      )}
    </Wrapper>
  );
}

export default React.memo(observer(FormattedDataView));
