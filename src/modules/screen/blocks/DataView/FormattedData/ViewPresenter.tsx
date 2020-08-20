import React from "react";
import { observer } from "mobx-react-lite";
import { assoc, isNil } from "ramda";
import { useSetState } from "react-use";
import { elevation8 } from "style/shadows";

import Wrapper from "primitives/Wrapper";
import Dropdown, { DropdownSize, DropdownTitlePosition } from "primitives/Dropdown";
import ClearInputWrapper from "primitives/Input/ClearInputWrapper";

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
  jc,
  marginLeft,
  padding,
  paddingBottom,
} from "libs/styles";
import { useScrollCallbackWasScrolledBoolean } from "libs/hooks/scroll";
import { useLocalStorage } from "libs/hooks/special";

import { ViewMetaData } from "../types";

import TableViewBlockWrapper from "./TableViewBlock";
import CardsViewBlockWrapper from "./CardsViewBlock";
import Actions from "./Components/Actions";
import { notFoundElement } from "./Components/notFound";
import { spinnerElement } from "./Components/spinner";
import { getFormattedDataLocalStorageInitialValue, usePagination } from "./libs";
import { FormattedDataViewInterface } from "./types";

const initialMetaData: ViewMetaData = {
  loading: true,
  pagination: { itemsCount: 0, pagesCount: 0 },
};

function FormattedDataView({ options, actions, styles }: FormattedDataViewInterface) {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(options!.id, () =>
    getFormattedDataLocalStorageInitialValue(options!.showMode),
  );
  const [page, setPage] = React.useState(1);

  const [metaData, setMetaData] = useSetState(initialMetaData);

  const { actions: paginationViewActions, data: paginationViewData, show: showPaginationRaw } = usePagination(
    options!.paginationView,
  );

  const {
    scrolled: cardsScrolled,
    setScrollableElement: setCardsScrollableElement,
  } = useScrollCallbackWasScrolledBoolean();

  const isCardsView = React.useMemo(() => localStorageValue.mode === "cards", [localStorageValue.mode]);

  const showModeChangerButton = React.useMemo(() => options!.showMode === "all" || isNil(options!.showMode), []);

  if (paginationViewData.loadingContainer.loading) return null;

  const itemsIsEmptyList = metaData.pagination!.itemsCount === 0;

  const showPagination = !itemsIsEmptyList && showPaginationRaw;

  const notFound = !metaData.loading && itemsIsEmptyList && notFoundElement;

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
        showModeChangerButton={showModeChangerButton}
        onSearchChange={onSearchChange}
      />
      {isCardsView ? (
        <CardsViewBlockWrapper
          ref={setCardsScrollableElement}
          setMetaData={setMetaData}
          notFound={notFound}
          spinner={spinner}
          options={options!.cardsView}
        />
      ) : (
        <TableViewBlockWrapper
          id={options!.id}
          options={options!.tableView}
          notFound={notFound}
          spinner={spinner}
          actions={actions!}
          setMetaData={setMetaData}
        />
      )}
      {showPagination && (
        <Wrapper styles={[flex, jc(Aligns.SPACE_BETWEEN), padding(16), borderTop(1, "gray-blue/02")]}>
          <Dropdown
            titlePosition={DropdownTitlePosition.LEFT}
            title="Показывать по:"
            size={DropdownSize.MEDIUM}
            items={options!.paginationView.options?.paginationItems.map((code) => ({ code, title: code }))}
            selectedItemCode={paginationViewData.data!.perPage}
            onChange={async (value) => {
              await paginationViewActions.change.run({ page: 1, perPage: value });
              setLocalStorageValue({ ...localStorageValue, perPage: value as number });
            }}
          />
          <Pagination
            styles={marginLeft(16)}
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
