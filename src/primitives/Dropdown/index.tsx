import React, { Ref } from "react";
import { flatten, prop, propEq } from "ramda";
import { duration200 } from "layout/durations";

import Icon from "primitives/Icon";

import {
  ai,
  Aligns,
  backgroundColor,
  borderNone,
  borderRadius,
  boxShadow,
  disableOutline,
  firstChild,
  flex,
  flexValue,
  focus,
  fullWidth,
  hover,
  marginBottom,
  marginLeft,
  marginRight,
  padding,
  pointer,
  position,
  textAlign,
  transform,
  transition,
  whiteSpace,
  width,
} from "libs/styles";
import { provideRef } from "libs/provideRef";

import Typography from "../Typography";
import Wrapper from "../Wrapper";
import { ListItemId, ListItemInterface, ListItemSize } from "../List";
import DroppedList from "../List/DroppedList";

export enum DropdownSize {
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

const paddingForSize: Record<DropdownSize, string> = {
  [DropdownSize.LARGE]: "10px 8px 10px 12px",
  [DropdownSize.MEDIUM]: "4px 8px 4px 12px",
};

const matchingDropdownSizeAndItemSize: Record<DropdownSize, ListItemSize> = {
  [DropdownSize.LARGE]: ListItemSize.LARGE,
  [DropdownSize.MEDIUM]: ListItemSize.MEDIUM,
};

export enum DropdownTitlePosition {
  TOP,
  LEFT,
}

interface DropdownInterface<ITEM> {
  outerStyles?: any;
  title?: string;
  titlePosition?: DropdownTitlePosition;
  size?: DropdownSize;
  placeholder?: string;
  selectedItemId?: ITEM;
  items?: ListItemInterface<ITEM>[];
  groupedItems?: { groupName: string; items: ListItemInterface<ITEM>[] }[];
  onChange: (id: ITEM) => void;
}

const dropdownWrapperStylesByTitlePosition: Record<DropdownTitlePosition, any> = {
  [DropdownTitlePosition.LEFT]: [flex, ai(Aligns.CENTER), firstChild(marginRight(8))],
  [DropdownTitlePosition.TOP]: [firstChild(marginBottom(8))],
};

const Dropdown = React.forwardRef(function (
  {
    outerStyles,
    size = DropdownSize.MEDIUM,
    title,
    titlePosition = DropdownTitlePosition.TOP,
    placeholder,
    selectedItemId,
    groupedItems,
    items,
    onChange,
  }: DropdownInterface<any>,
  ref: Ref<HTMLElement>,
) {
  const selectedItem = React.useMemo(() => {
    if (items) return items.find(propEq("id", selectedItemId));
    return flatten(groupedItems!.map(prop("items"))).find(propEq("id", selectedItemId));
  }, [selectedItemId]);

  return (
    <DroppedList
      margin={6}
      itemSize={matchingDropdownSizeAndItemSize[size]}
      items={items?.map((item) => ({
        ...item,
        rightContent:
          selectedItemId === item.id ? <Icon icon="check" color="blue/06" /> : <Wrapper styles={width(24)} />,
      }))}
      selectedItemId={selectedItemId}
      onChange={(id) => onChange(id)}
    >
      {(state, parentRef, subChild) => (
        <Wrapper styles={[title && dropdownWrapperStylesByTitlePosition[titlePosition], outerStyles]}>
          {title && (
            <Typography color="gray-blue/05" styles={whiteSpace("nowrap")}>
              {title}
            </Typography>
          )}
          <Wrapper
            as="button"
            styles={[
              fullWidth,
              disableOutline,
              borderNone,
              pointer,
              flex,
              ai(Aligns.CENTER),
              position("relative"),
              padding(paddingForSize[size]),
              borderRadius(4),
              backgroundColor("gray-blue/01"),
              transition(`all ${duration200}`),
              boxShadow([0, 0, 0, 1, "gray-blue/02"]),
              hover(boxShadow([0, 0, 0, 1, "gray-blue/03"])),
              focus(boxShadow([0, 0, 0, 2, "blue/04"])),
            ]}
            onClick={state.toggle}
            ref={provideRef(ref, parentRef)}
          >
            {selectedItem ? (
              <Typography styles={[flexValue(1), textAlign("left")]} dots>
                {selectedItem.title}
              </Typography>
            ) : (
              <Typography styles={[flexValue(1), textAlign("left")]} dots color="gray-blue/03">
                {placeholder}
              </Typography>
            )}
            <Icon
              icon="arrow-down"
              styles={[
                transition(`all ${duration200}`),
                transform(`rotateZ(${state.opened ? "180deg" : "0deg"})`),
                marginLeft(4),
              ]}
              color="gray-blue/07"
            />
            {subChild}
          </Wrapper>
        </Wrapper>
      )}
    </DroppedList>
  );
});

export default React.memo(Dropdown) as <ITEM>(
  props: DropdownInterface<ITEM> & { ref?: Ref<HTMLElement> },
) => JSX.Element;
