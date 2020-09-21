import React from "react";

import { useEffectSkipFirst } from "libs/hooks/common";
import searchInString from "libs/searchInString";

import Icon, { Icons } from "../Icon";
import { InputSize } from "../Input/InputWrapper";
import { ButtonSize } from "../Button";
import { ListItemInterface, ListItemSize } from "../List/ListItem";

import { DropdownContainerInterface, DropdownItem } from "./types";

export function useItems<CODE extends string | number>(
  excludeSelected?: boolean,
  selectedItemCodes: DropdownContainerInterface<CODE>["selectedItemCodes"] = [],
  items: DropdownContainerInterface<CODE>["items"] = [],
) {
  const [search, setSearch] = React.useState("");

  const selectedItems = React.useMemo(() => items.filter((item) => selectedItemCodes.includes(item.code)), [
    selectedItemCodes,
    items,
  ]);

  const [searchedItems, setSearchedItems] = React.useState(items);

  const resultItems: DropdownItem<CODE>[] = React.useMemo(() => {
    const result = searchedItems.map((item) => ({
      ...item,
      rightContent: selectedItemCodes.includes(item.code) ? <Icon icon="check" color="blue/06" /> : undefined,
    }));
    if (excludeSelected) return result.filter((item) => !selectedItemCodes.includes(item.code));
    return result;
  }, [searchedItems, selectedItemCodes]);

  useEffectSkipFirst(() => {
    setSearchedItems(items.filter((item) => searchInString(item.title.toString(), search)));
  }, [items, search]);

  return { search, selectedItems, resultItems, setSearch };
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
    leftContent: <Icon icon={icon} />,
    code: "_",
    title,
  };
}
