import React from "react";
import { duration200Number } from "layout/durations";
import { animated, useSpring } from "react-spring";
import { elevation16 } from "style/shadows";
import { useHover } from "react-use";
import { Placement } from "@popperjs/core";

import {
  backgroundColor,
  border,
  borderRadius,
  fullWidth,
  marginRight,
  maxWidth,
  minWidth,
  padding,
  position,
  zIndex,
} from "libs/styles";
import { useBoolean } from "libs/hooks";
import { provideRef } from "libs/provideRef";

import Wrapper from "../Wrapper";
import usePopper, { getPopperMarginStyleForPlacement } from "../Popper/usePopper";
import HandleClickOutside from "../HandleClickOutside";

import List, { ListItemInterface, ListItemSize } from "./index";

export enum DroppedListOpenMode {
  HOVER,
  CLICK,
}

interface DroppedListInterface {
  mode?: DroppedListOpenMode;
  placement?: Placement;
  itemSize?: ListItemSize;
  ignoreClickOutsideElements?: (HTMLElement | undefined | null)[];
  margin: number;
  selectedItemId?: string | number;
  items?: ListItemInterface[];
  groupedItems?: { groupName: string; items: ListItemInterface[] }[];
  children: (
    state: { toggle: () => void; opened: boolean; open: () => void; close: () => void },
    parentRef: any,
    subChild: JSX.Element,
  ) => JSX.Element;
  onChange: (id: string | number, close: () => void) => void;
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
}: DroppedListInterface) {
  const [opened, open, close] = useBoolean(false);

  const spring = useSpring({
    config: { duration: duration200Number },
    opacity: opened ? 1 : 0,
  });

  const { initPopper, placement } = usePopper({ placement: placementProp });

  const Component = ComponentForOpenMode[mode];

  const renderChild = (ref: any) =>
    children(
      { open, close, opened, toggle: () => (opened ? close() : open()) },
      provideRef(ref, initPopper("parent")),
      <Wrapper
        as={animated.div}
        style={{
          opacity: spring.opacity,
          visibility: spring.opacity.to((value) => (value === 0 ? "hidden" : "visible")),
        }}
        styles={[maxWidth(480), minWidth("calc(100% + 40px)"), zIndex(1)]}
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

export default React.memo(DroppedList);
