import React from "react";
import { observer } from "mobx-react-lite";

import Button, { ButtonSize, ButtonType } from "primitives/Button";
import Wrapper from "primitives/Wrapper";

import { ai, Aligns, child, flex, flexValue, flexWrap, lastChild, marginLeft, marginRight, padding } from "libs/styles";
import { formattedDataViewZIndexes } from "libs/styles/zIndexes";

import ActionInput from "modules/screen/blocks/Actions/Input";
import ActionSorting from "modules/screen/blocks/Actions/Sorting";

import { FormattedDataViewInterface } from "../types";
import { formattedDataLocalStorageInitialValue } from "../libs";

type ActionType = Pick<FormattedDataViewInterface, "actions" | "options"> & {
  styles?: any;
  isCardsView: boolean;
  storage: typeof formattedDataLocalStorageInitialValue;
  setStorage: (data: typeof formattedDataLocalStorageInitialValue) => void;
  paginationElement: React.ReactNode;
  onSearchChange?: (text: string) => void;
};

function Actions({
  styles,
  actions,
  options,
  isCardsView,
  setStorage,
  storage,
  paginationElement,
  onSearchChange,
}: ActionType) {
  return (
    <Wrapper
      styles={[
        padding(16),
        flex,
        ai(Aligns.CENTER),
        flexWrap,
        formattedDataViewZIndexes.actionsPanel,
        child(marginRight(16)),
        lastChild(marginRight(0)),
        styles,
      ]}
    >
      {actions?.search && (
        <ActionInput actions={{ change: actions.search }} options={options?.searchOptions} onChange={onSearchChange} />
      )}
      {isCardsView && actions?.sorting && (
        <ActionSorting
          styles={[actions?.search && marginLeft(8)]}
          actions={{ change: actions.sorting }}
          options={options?.cardsView.options?.sortingOptions}
        />
      )}
      <Wrapper styles={flexValue(1)} />
      {paginationElement}
      <Button
        type={ButtonType.ICON}
        size={ButtonSize.MEDIUM}
        iconLeft={isCardsView ? "density-high" : "dashboard"}
        onClick={() => setStorage({ ...storage, mode: isCardsView ? "table" : "cards" })}
      />
    </Wrapper>
  );
}

export default React.memo(observer(Actions));
