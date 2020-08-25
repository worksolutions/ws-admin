import React from "react";
import { propEq } from "ramda";

import { marginRight, width } from "libs/styles";
import { useEffectSkipFirst } from "libs/hooks/common";
import searchInString from "libs/searchInString";

import Icon, { Icons } from "../Icon";
import Wrapper from "../Wrapper";
import { InputSize } from "../Input/InputWrapper";
import { ButtonSize } from "../Button";
import { ListItemInterface, ListItemSize } from "../List/ListItem";

import { DropdownItem } from "./types";

export function useItems<CODE extends string | number>(selectedItemCode: CODE, items: DropdownItem<CODE>[] = []) {
  const [search, setSearch] = React.useState("");

  const selectedItem = React.useMemo(() => items.find(propEq("code", selectedItemCode))!, [selectedItemCode]);

  const [searchedItems, setSearchedItems] = React.useState(items);

  const resultItems = React.useMemo(
    () =>
      searchedItems.map((item) => ({
        ...item,
        rightContent:
          selectedItemCode === item.code ? <Icon icon="check" color="blue/06" /> : <Wrapper styles={width(24)} />,
      })),
    [searchedItems],
  );

  useEffectSkipFirst(() => {
    setSearchedItems(items.filter((item) => searchInString(item.title.toString(), search)));
  }, [search]);

  return { search, selectedItem, resultItems, setSearch };
}

export const matchingDropdownSizeAndItemSize: Record<InputSize, ListItemSize> = {
  [InputSize.LARGE]: ListItemSize.LARGE,
  [InputSize.MEDIUM]: ListItemSize.MEDIUM,
};

export const matchDropdownSizeAndSearchSize: Record<
  InputSize,
  { inputSize: InputSize; clearButtonSize: ButtonSize }
> = {
  [InputSize.MEDIUM]: {
    clearButtonSize: ButtonSize.SMALL,
    inputSize: InputSize.MEDIUM,
  },
  [InputSize.LARGE]: {
    clearButtonSize: ButtonSize.MEDIUM,
    inputSize: InputSize.LARGE,
  },
};

export function makeOptionalActionItem(title: string, icon?: Icons): ListItemInterface<any> {
  return {
    leftContent: <Icon icon={icon} styles={marginRight(8)} />,
    code: "_",
    title,
  };
}
