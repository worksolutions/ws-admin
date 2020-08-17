import React from "react";
import { observer } from "mobx-react-lite";
import { zIndex_formattedDataView_actionsPanel } from "layout/zIndexes";

import Button, { ButtonSize, ButtonType } from "primitives/Button";
import Wrapper from "primitives/Wrapper";

import { ai, Aligns, child, flex, flexValue, flexWrap, lastChild, marginLeft, marginRight, padding } from "libs/styles";

import ActionInput from "modules/screen/blocks/Actions/Input";
import ActionSorting from "modules/screen/blocks/Actions/Sorting";

import { FormattedDataViewInterface } from "../types";
import { FormattedDataLocalStorageInitialValueType } from "../libs";
import { InputSize } from "../../../../../../primitives/Input/InputWrapper";

type ActionType = Pick<FormattedDataViewInterface, "actions" | "options"> & {
  styles?: any;
  isCardsView: boolean;
  showModeChangerButton: boolean;
  storage: FormattedDataLocalStorageInitialValueType;
  setStorage: (data: FormattedDataLocalStorageInitialValueType) => void;
  onSearchChange?: (text: string) => void;
};

function Actions({
  styles,
  actions,
  options,
  isCardsView,
  setStorage,
  showModeChangerButton,
  storage,
  onSearchChange,
}: ActionType) {
  return (
    <Wrapper
      styles={[
        padding(16),
        flex,
        ai(Aligns.CENTER),
        flexWrap,
        zIndex_formattedDataView_actionsPanel,
        child(marginRight(16)),
        lastChild(marginRight(0)),
        child(padding(0), "&:empty"),
        styles,
      ]}
    >
      {actions?.search && (
        <ActionInput
          actions={{ change: actions.search }}
          options={{
            debounce: 600,
            cleanable: true,
            iconLeft: "search-big",
            size: InputSize.MEDIUM,
            ...options!.searchOptions,
          }}
          onChange={onSearchChange}
        />
      )}
      {isCardsView && actions?.sorting && (
        <ActionSorting
          styles={[actions?.search && marginLeft(8)]}
          actions={{ change: actions.sorting }}
          options={options?.cardsView.options?.sortingOptions}
        />
      )}
      {showModeChangerButton && (
        <>
          <Wrapper styles={flexValue(1)} />
          <Button
            type={ButtonType.ICON}
            size={ButtonSize.MEDIUM}
            iconLeft={isCardsView ? "density-high" : "dashboard"}
            onClick={() => setStorage({ ...storage, mode: isCardsView ? "table" : "cards" })}
          />
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(observer(Actions));
