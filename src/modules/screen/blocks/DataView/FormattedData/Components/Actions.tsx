import React from "react";
import { observer } from "mobx-react-lite";

import Button, { ButtonSize, ButtonType } from "primitives/Button";
import Wrapper from "primitives/Wrapper";
import { InputSize } from "primitives/Input/InputWrapper";

import { ai, Aligns, child, flex, flexWrap, lastChild, marginLeft, marginRight, padding } from "libs/styles";

import ActionInput from "modules/screen/blocks/Actions/Input";
import ActionSorting from "modules/screen/blocks/Actions/Sorting";

import { FormattedDataViewInterface } from "../types";
import { FormattedDataLocalStorageInitialValueType } from "../libs";

type MainActionType = Pick<FormattedDataViewInterface, "actions" | "options"> & {
  isCardsView: boolean;
  onSearchChange?: (text: string) => void;
};

type AdditionalActionType = {
  isCardsView: boolean;
  showModeChangerButton: boolean;
  storage: FormattedDataLocalStorageInitialValueType;
  setStorage: (data: FormattedDataLocalStorageInitialValueType) => void;
};

function MainActionComponent({
  actions,
  options,
  showSearch,
  showSorting,
  onSearchChange,
}: MainActionType & { showSearch: boolean; showSorting: boolean }) {
  return (
    <Wrapper styles={[flex, flexWrap, child(marginRight(16)), child(padding(0), "&:empty")]}>
      {showSearch && (
        <ActionInput
          actions={{ change: actions!.search }}
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
      {showSorting && (
        <ActionSorting
          styles={[actions?.search && marginLeft(8)]}
          actions={{ change: actions!.sorting }}
          options={options?.cardsView.options?.sortingOptions}
        />
      )}
    </Wrapper>
  );
}

const MainActions = React.memo(observer(MainActionComponent));

export function renderMainActions(props: MainActionType) {
  const showSearch = !!props.actions?.search;
  const showSorting = !!(props.isCardsView && props.actions?.sorting);
  if (!(showSearch || showSorting)) return null;
  return <MainActions {...props} showSearch={showSearch} showSorting={showSorting} />;
}

function AdditionalActionComponent({ isCardsView, setStorage, storage }: AdditionalActionType) {
  return (
    <Button
      type={ButtonType.ICON}
      size={ButtonSize.MEDIUM}
      iconLeft={isCardsView ? "density-high" : "dashboard"}
      onClick={() => setStorage({ ...storage, mode: isCardsView ? "table" : "cards" })}
    />
  );
}

const AdditionalActions = React.memo(observer(AdditionalActionComponent));

export function renderAdditionalActions(props: AdditionalActionType) {
  if (!props.showModeChangerButton) return null;
  return <AdditionalActions {...props} />;
}
