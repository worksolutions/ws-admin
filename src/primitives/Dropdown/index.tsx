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
  flex,
  flexValue,
  focus,
  marginLeft,
  padding,
  pointer,
  position,
  textAlign,
  transform,
  transition,
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
  [DropdownSize.LARGE]: "10px 12px",
  [DropdownSize.MEDIUM]: "4px 12px",
};

const matchingDropdownSizeAndItemSize: Record<DropdownSize, ListItemSize> = {
  [DropdownSize.LARGE]: ListItemSize.LARGE,
  [DropdownSize.MEDIUM]: ListItemSize.MEDIUM,
};

interface DropdownInterface {
  size?: DropdownSize;
  placeholder?: string;
  selectedItemId?: ListItemId;
  items?: ListItemInterface[];
  groupedItems?: { groupName: string; items: ListItemInterface[] }[];
  onChange: (id: ListItemId) => void;
}

const Dropdown = React.forwardRef(function Dropdown(
  { size = DropdownSize.MEDIUM, placeholder, selectedItemId, groupedItems, items, onChange }: DropdownInterface,
  ref: Ref<HTMLElement>,
) {
  const selectedItem = React.useMemo(() => {
    if (items) return items.find(propEq("id", selectedItemId));
    return flatten(groupedItems!.map(prop("items"))).find(propEq("id", selectedItemId));
  }, [selectedItemId]);

  return (
    <DroppedList
      margin={4}
      itemSize={matchingDropdownSizeAndItemSize[size]}
      items={items?.map((item) => ({
        ...item,
        rightContent:
          selectedItemId === item.id ? <Icon iconName="check" color="blue/06" /> : <Wrapper styles={width(24)} />,
      }))}
      onChange={(id) => onChange(id)}
    >
      {(state, parentRef, subChild) => (
        <Wrapper
          as="button"
          styles={[
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
            iconName="arrow-down"
            styles={[
              transition(`all ${duration200}`),
              transform(`rotateZ(${state.opened ? "180deg" : "0deg"})`),
              marginLeft(4),
            ]}
            color="gray-blue/07"
          />
          {subChild}
        </Wrapper>
      )}
    </DroppedList>
  );
});

export default React.memo(Dropdown);
