import React from "react";
import { animated } from "react-spring";
import { elevation16 } from "style/shadows";
import { useHover } from "react-use";
import { Placement } from "@popperjs/core";
import { zIndex_popup } from "layout/zIndexes";

import { backgroundColor, border, borderRadius, maxWidth, minWidth, padding, position } from "libs/styles";
import { provideRef } from "libs/provideRef";

import Wrapper from "../Wrapper";
import usePopper, { getPopperMarginStyleForPlacement } from "../Popper/usePopper";
import HandleClickOutside from "../HandleClickOutside";
import { useVisibilityAnimation } from "../Popper/useVisibilityAnimation";

import List, { ListItemInterface, ListItemSize } from "./index";

export enum DroppedListOpenMode {
  HOVER,
  CLICK,
}

interface DroppedListInterface<ITEM> {
  mode?: DroppedListOpenMode;
  placement?: Placement;
  itemSize?: ListItemSize;
  ignoreClickOutsideElements?: (HTMLElement | undefined | null)[];
  margin: number;
  selectedItemId?: ITEM;
  items?: ListItemInterface<ITEM>[];
  groupedItems?: { groupName: string; items: ListItemInterface<ITEM>[] }[];
  children: (
    state: { toggle: () => void; opened: boolean; open: () => void; close: () => void },
    parentRef: any,
    subChild: JSX.Element,
  ) => JSX.Element;
  onChange: (id: ITEM, close: () => void) => void;
}

const ComponentForOpenMode: Record<
  DroppedListOpenMode,
  (props: {
    opened: boolean;
    open: () => void;
    close: () => void;
    ignoreHtmlClickElements?: (HTMLElement | undefined | null)[];
    children: (ref?: any) => JSX.Element;
  }) => JSX.Element
> = {
  [DroppedListOpenMode.CLICK]: ({ opened, close, children, ignoreHtmlClickElements }) => {
    return (
      <HandleClickOutside ignoreElements={ignoreHtmlClickElements} enabled={opened} onClickOutside={close}>
        {(ref) => children(ref)}
      </HandleClickOutside>
    );
  },
  [DroppedListOpenMode.HOVER]: ({ open, close, children }) => {
    const [hoverable, hovered] = useHover(() => {
      return <div>{children()}</div>;
    });

    React.useEffect(() => {
      if (hovered) {
        open();
        return;
      }
      close();
    }, [hovered]);

    return <Wrapper styles={[position("relative")]}>{hoverable}</Wrapper>;
  },
};

function DroppedList({
  mode = DroppedListOpenMode.CLICK,
  placement: placementProp = "bottom-start",
  itemSize,
  selectedItemId,
  ignoreClickOutsideElements,
  items,
  margin: marginProp,
  children,
  onChange,
}: DroppedListInterface<any>) {
  const { opened, style, close, open } = useVisibilityAnimation();

  const { initPopper, placement } = usePopper({ placement: placementProp });

  const Component = ComponentForOpenMode[mode];

  const renderChild = (clickOutsideRef: any) =>
    children(
      { open, close, opened, toggle: () => (opened ? close() : open()) },
      provideRef(clickOutsideRef, initPopper("parent")),
      <Wrapper
        as={animated.div}
        style={style}
        styles={[maxWidth(480), minWidth("calc(100% + 40px)"), zIndex_popup]}
        ref={initPopper("child")}
      >
        <Wrapper
          styles={[
            getPopperMarginStyleForPlacement(placement, marginProp),
            backgroundColor("white"),
            border(1, "gray-blue/02"),
            elevation16,
            borderRadius(6),
            padding("4px 8px"),
          ]}
        >
          {items ? (
            <List
              itemSize={itemSize}
              titleDots
              activeItemId={selectedItemId}
              items={items}
              onClick={(id) => onChange(id, close)}
            />
          ) : null}
        </Wrapper>
      </Wrapper>,
    );

  return (
    <Component ignoreHtmlClickElements={ignoreClickOutsideElements} opened={opened} open={open} close={close}>
      {renderChild}
    </Component>
  );
}

export default React.memo(DroppedList) as <ITEM>(props: DroppedListInterface<ITEM>) => JSX.Element;
