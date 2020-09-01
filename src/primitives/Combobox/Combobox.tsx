import React, { Ref } from "react";
import { v4 as uuidV4 } from "uuid";
import { propEq, remove, without } from "ramda";

import DropdownContainer, { createDropdownRightIcon } from "primitives/Dropdown/DropdownContainer";

import { flex, flexWrap, height, marginRight, padding, pointer } from "libs/styles";
import { provideRef } from "libs/provideRef";
import eventValue from "libs/decorators/eventValue";

import Wrapper from "../Wrapper";
import { InputSize } from "../Input/Input";
import InputWrapper, { createDefaultInputStyles } from "../Input/InputWrapper";
import { DroppedListStateController } from "../List/DroppedList";
import Form from "../Form";

import { ComboboxInterface } from "./types";
import Token from "./Token";

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
  const handleInputRef = (state: DroppedListStateController) => (ref: HTMLInputElement | null) => {
    if (!ref) return;
    ref.addEventListener("focus", state.open);
  };

  const [value, setValue] = React.useState("");

  function onSelectItem(code: string) {
    onChange([...selectedItemCodes, code]);
  }

  function onCreateToken() {
    const code = uuidV4();
    onChangeItemsList([...items, { code, title: value }]);
    onSelectItem(code);
    setValue("");
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
        <InputWrapper
          outerStyles={[outerStyles, pointer]}
          outerRef={provideRef(ref, parentRef)}
          size={InputSize.LARGE}
          {...inputWrapperProps}
          onClick={state.open}
          iconRight={createDropdownRightIcon(state.opened)}
          renderComponent={(styles) => (
            <Wrapper styles={[styles, flex, flexWrap, padding("8px 40px 8px 8px"), stylesProp]}>
              {selectedItems.map(({ code, title }) => (
                <Token key={code} styles={marginRight(8)} title={title} remove={() => onRemoveToken(code)} />
              ))}
              <Form styles={height(24)} onSubmit={onCreateToken}>
                <Wrapper
                  as="input"
                  placeholder={selectedItems.length === 0 ? placeholder : ""}
                  styles={createDefaultInputStyles()}
                  ref={handleInputRef(state)}
                  value={value}
                  onChange={eventValue(setValue)}
                />
              </Form>
              {subChild}
            </Wrapper>
          )}
        />
      )}
    </DropdownContainer>
  );
};

export default React.memo(React.forwardRef(Combobox)) as <ITEM extends string | number>(
  props: ComboboxInterface<ITEM> & { ref?: Ref<HTMLElement> },
) => JSX.Element;
