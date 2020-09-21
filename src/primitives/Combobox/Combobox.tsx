import React, { Ref } from "react";
import { v4 as uuidV4 } from "uuid";
import { without } from "ramda";

import DropdownContainer, { createDropdownRightIcon } from "primitives/Dropdown/DropdownContainer";
import TokenList from "primitives/TokenList";

import { padding, paddingRight, pointer } from "libs/styles";
import { provideRef } from "libs/provideRef";

import { InputSize } from "../Input/Input";

import { ComboboxInterface } from "./types";

const Combobox = function (
  {
    styles: stylesProp,
    optionalAction,
    outerStyles,
    placeholder,
    selectedItemCodes = [],
    searchableEmptyListText = "Выбраны все элементы",
    searchableNotFoundText,
    items = [],
    onChange,
    onChangeItemsList,
    ...inputWrapperProps
  }: ComboboxInterface<string>,
  ref: Ref<HTMLElement>,
) {
  function onSelectItem(code: string) {
    onChange([...selectedItemCodes, code]);
  }

  function onCreateToken(title: string) {
    const code = uuidV4();
    onChangeItemsList([...items, { code, title }]);
    onSelectItem(code);
  }

  function onRemoveToken(code: string) {
    onChange(without([code], selectedItemCodes));
  }

  return (
    <DropdownContainer
      excludeSelected
      searchableNotFoundText={searchableNotFoundText}
      searchableEmptyListText={searchableEmptyListText}
      selectedItemCodes={selectedItemCodes}
      items={items}
      size={InputSize.LARGE}
      optionalAction={optionalAction}
      searchable
      onChange={onSelectItem}
    >
      {(selectedItems) => (state, parentRef, subChild) => (
        <>
          <TokenList
            outerStyles={[outerStyles, pointer]}
            ref={provideRef(ref, parentRef)}
            styles={[stylesProp, paddingRight(40)]}
            items={selectedItems}
            placeholder={placeholder}
            iconRight={createDropdownRightIcon(state.opened)}
            onClick={state.open}
            {...inputWrapperProps}
            onCreate={onCreateToken}
            onRemove={onRemoveToken}
          >
            {subChild}
          </TokenList>
        </>
      )}
    </DropdownContainer>
  );
};

export default React.memo(React.forwardRef(Combobox)) as <ITEM extends string | number>(
  props: ComboboxInterface<ITEM> & { ref?: Ref<HTMLElement> },
) => JSX.Element;
