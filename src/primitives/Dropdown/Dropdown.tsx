import React, { Ref } from "react";
import { duration160 } from "layout/durations";

import {
  active,
  ai,
  Aligns,
  backgroundColor,
  borderBottom,
  borderRadius,
  borderTop,
  flex,
  flexValue,
  focus,
  hover,
  marginLeft,
  marginRight,
  marginTop,
  paddingBottom,
  paddingLeft,
  pointer,
  textAlign,
  transform,
  transition,
} from "libs/styles";
import { provideRef } from "libs/provideRef";
import { emptyBoxShadow } from "libs/styles/cleaner";
import { isString } from "libs/is";

import Icon from "../Icon";
import ListItem from "../List/ListItem";
import Typography from "../Typography";
import Wrapper from "../Wrapper";
import DroppedList from "../List/DroppedList";
import Input, { InputSize } from "../Input/Input";
import ClearInputWrapper from "../Input/ClearInputWrapper";
import InputWrapper from "../Input/InputWrapper";

import { DropdownInterface } from "./types";
import {
  makeOptionalActionItem,
  matchDropdownSizeAndSearchSize,
  matchingDropdownSizeAndItemSize,
  useItems,
} from "./libs";

type DropdownComponentInterface<CODE extends string | number> = DropdownInterface<CODE> & { searchable?: boolean };

const Dropdown = function (
  {
    styles: stylesProp,
    searchable,
    optionalAction,
    outerStyles,
    size = InputSize.MEDIUM,
    placeholder,
    selectedItemCode,
    items,
    onChange,
    ...inputWrapperProps
  }: DropdownComponentInterface<any>,
  ref: Ref<HTMLElement>,
) {
  const { search, selectedItem, resultItems, setSearch } = useItems(selectedItemCode, items);

  const clearSearch = () => setSearch("");

  const itemSize = matchingDropdownSizeAndItemSize[size];

  return (
    <DroppedList
      margin={6}
      itemSize={itemSize}
      items={resultItems}
      selectedItemId={selectedItemCode}
      includeMinWidthCalculation={!searchable}
      emptyText={searchable ? "Нет результатов" : undefined}
      topComponent={
        searchable && (
          <ClearInputWrapper
            styles={[marginLeft(4), marginRight(4), borderBottom(1, "gray-blue/02"), paddingBottom(4)]}
            needShow={!!search}
            size={matchDropdownSizeAndSearchSize[size].clearButtonSize}
            clear={clearSearch}
          >
            <Input
              placeholder="Найти в списке"
              autofocus
              styles={[
                backgroundColor("white"),
                paddingLeft(0),
                borderRadius(0),
                emptyBoxShadow,
                hover(emptyBoxShadow),
                focus(emptyBoxShadow),
                active(emptyBoxShadow),
              ]}
              size={matchDropdownSizeAndSearchSize[size].inputSize}
              outerStyles={flexValue(1)}
              value={search}
              onChange={setSearch}
            />
          </ClearInputWrapper>
        )
      }
      bottomComponent={
        optionalAction && (
          <>
            <Wrapper styles={[marginLeft(4), marginRight(4), borderTop(1, "gray-blue/02")]} />
            <ListItem
              item={makeOptionalActionItem(optionalAction.title, optionalAction.icon)}
              isActiveItem={false}
              itemSize={itemSize}
              styles={marginTop(4)}
              onClick={optionalAction.onClick}
            />
          </>
        )
      }
      onChange={(id, close) => {
        onChange(id);
        close();
      }}
      onClose={clearSearch}
    >
      {(state, parentRef, subChild) => (
        <InputWrapper
          outerStyles={[outerStyles, pointer]}
          outerRef={provideRef(ref, parentRef)}
          size={size}
          {...inputWrapperProps}
          onClick={state.toggle}
          iconLeft={selectedItem?.leftContent}
          iconRight={
            <Icon
              icon="arrow-down"
              styles={[transition(`all ${duration160}`), transform(`rotateZ(${state.opened ? "180deg" : "0deg"})`)]}
              color="gray-blue/07"
            />
          }
          renderComponent={(styles) => (
            <Wrapper as="button" styles={[styles, stylesProp, pointer]}>
              {selectedItem ? (
                <Wrapper styles={[flex, ai(Aligns.CENTER)]}>
                  <Typography styles={[flexValue(1), textAlign("left")]} dots>
                    {selectedItem.title}
                  </Typography>
                </Wrapper>
              ) : (
                <Typography
                  className="placeholder"
                  styles={[flexValue(1), textAlign("left")]}
                  dots
                  color="gray-blue/04"
                >
                  {placeholder}
                </Typography>
              )}

              {subChild}
            </Wrapper>
          )}
        />
      )}
    </DroppedList>
  );
};

export default React.memo(React.forwardRef(Dropdown)) as <ITEM extends string | number>(
  props: DropdownComponentInterface<ITEM> & { ref?: Ref<HTMLElement> },
) => JSX.Element;
