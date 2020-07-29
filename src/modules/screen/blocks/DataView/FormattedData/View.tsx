import React from "react";
import { observer } from "mobx-react-lite";
import { assoc } from "ramda";
import { useSetState } from "react-use";
import { elevation8 } from "style/shadows";

import Wrapper from "primitives/Wrapper";
import Dropdown, { DropdownSize } from "primitives/Dropdown";

import Pagination from "components/Pagination/Pagination";

import {
  ai,
  Aligns,
  border,
  borderRadius,
  borderTop,
  flex,
  flexColumn,
  flexValue,
  fullWidth,
  jc,
  overflowY,
  padding,
  paddingBottom,
  position,
} from "libs/styles";
import { useLocalStorage, useScrollCallbackWasScrolledBoolean } from "libs/hooks";

import CardsViewBlock from "../Cards";
import { ViewMetaData } from "../types";

import TableComponent from "./Components/Table";
import { FormattedDataViewInterface } from "./types";
import Actions from "./Components/Actions";
import { notFoundElement } from "./Components/notFound";
import { formattedDataLocalStorageInitialValue, usePagination } from "./libs";
import { spinnerElement } from "./Components/spinner";

const initialMetaData: ViewMetaData = {
  loading: true,
  pagination: { itemsCount: 0, pagesCount: 0 },
};

function FormattedDataView({ options, actions, styles }: FormattedDataViewInterface) {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(options!.id, formattedDataLocalStorageInitialValue);
  const [page, setPage] = React.useState(1);

  const [metaData, setMetaData] = useSetState(initialMetaData);

  const { actions: paginationViewActions, data: paginationViewData, show: showPaginationRaw } = usePagination(
    options!.paginationView,
  );

  const {
    scrolled: cardsScrolled,
    setScrollableElement: setCardsScrollableElement,
  } = useScrollCallbackWasScrolledBoolean();

  if (paginationViewData.loadingContainer.loading) return null;

  const itemsIsEmptyList = metaData.pagination!.itemsCount === 0;

  const showPagination = !itemsIsEmptyList && showPaginationRaw;

  const notFound = !metaData.loading && itemsIsEmptyList && notFoundElement;

  const isCardsView = localStorageValue.mode === "cards";

  const spinner = metaData.loading && spinnerElement;

  const onSearchChange = () => {
    if (paginationViewData.data!.page === 1) return;
    setPage(1);
    paginationViewActions.change.run(assoc("page", 1, paginationViewData.data!));
  };

  return (
    <Wrapper
      styles={[flex, ai(Aligns.STRETCH), flexValue(1), borderRadius(8), border(1, "gray-blue/02"), flexColumn, styles]}
    >
      <Actions
        styles={[isCardsView ? [cardsScrolled && elevation8] : [paddingBottom(8)]]}
        options={options}
        actions={actions}
        isCardsView={isCardsView}
        storage={localStorageValue}
        setStorage={setLocalStorageValue}
        onSearchChange={onSearchChange}
        paginationElement={
          showPagination && (
            <Dropdown
              size={DropdownSize.MEDIUM}
              items={options!.paginationView.options?.paginationItems.map((number) => ({ id: number, title: number }))}
              selectedItemId={paginationViewData.data!.perPage}
              onChange={async (value) => {
                await paginationViewActions.change.run({ page: 1, perPage: value });
                setLocalStorageValue({ ...localStorageValue, perPage: value as number });
              }}
            />
          )
        }
      />
      {isCardsView ? (
        <Wrapper
          ref={setCardsScrollableElement}
          styles={[fullWidth, flexValue(1), overflowY("scroll"), position("relative")]}
        >
          {notFound}
          <CardsViewBlock {...options!.cardsView} onUpdateMeta={setMetaData} />
          {spinner}
        </Wrapper>
      ) : (
        <TableComponent
          options={options}
          notFound={notFound}
          spinner={spinner}
          actions={actions!}
          setMetaData={setMetaData}
        />
      )}
      {showPagination && (
        <Wrapper styles={[flex, jc(Aligns.END), padding(16), borderTop(1, "gray-blue/02")]}>
          <Pagination
            page={page}
            perPage={paginationViewData.data!.perPage}
            elementsCount={metaData.pagination!.itemsCount}
            onChange={(page) => {
              setPage(page);
              paginationViewActions.change.run(assoc("page", page, paginationViewData.data!));
            }}
          />
        </Wrapper>
      )}
    </Wrapper>
  );
}

export default React.memo(observer(FormattedDataView));
