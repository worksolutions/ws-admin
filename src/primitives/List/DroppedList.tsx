import React from "react";
import { animated } from "react-spring";
import { elevation16Raw } from "style/shadows";
import { useHover } from "react-use";
import { Placement } from "@popperjs/core";
import { zIndex_popup } from "layout/zIndexes";

import { backgroundColor, borderRadius, boxShadow, cursor, maxWidth, minWidth, padding, position } from "libs/styles";
import { provideRef } from "libs/provideRef";
import stopPropagation from "libs/stopPropagation";
import { useEffectSkipFirst } from "libs/hooks/common";

import Wrapper from "../Wrapper";
import usePopper, { getPopperMarginStyleForPlacement } from "../Popper/usePopper";
import HandleClickOutside from "../HandleClickOutside";
import { useVisibilityAnimation } from "../Popper/useVisibilityAnimation";

import List from "./index";
import { ListItemInterface, ListItemSize } from "./ListItem";

export enum DroppedListOpenMode {
  HOVER,
  CLICK,
}

export interface DroppedListStateController {
  toggle: () => void;
  opened: boolean;
  open: () => void;
  close: () => void;
}

export interface DroppedListInterface<ITEM extends string | number> {
  emptyText?: string;
  topComponent?: React.ReactNode;
  bottomComponent?: React.ReactNode;
  includeMinWidthCalculation?: boolean;
  mode?: DroppedListOpenMode;
  placement?: Placement;
  itemSize?: ListItemSize;
  ignoreClickOutsideElements?: (HTMLElement | undefined | null)[];
  margin: number;
  selectedItemIds?: (ITEM | null | undefined)[];
  items?: ListItemInterface<ITEM>[];
  groupedItems?: { groupName: string; items: ListItemInterface<ITEM>[] }[];
  children: (state: DroppedListStateController, parentRef: any, subChild: JSX.Element) => JSX.Element;
  onChange: (id: ITEM, close: () => void) => void;
  onClose?: () => void;
}

const ComponentByOpenMode: Record<
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

const toggleByOpenMode: Record<DroppedListOpenMode, (opened: boolean, open: () => void, close: () => void) => void> = {
  [DroppedListOpenMode.CLICK]: (opened, open, close) => (opened ? close() : open()),
  [DroppedListOpenMode.HOVER]: () => undefined,
};

function DroppedList({
  emptyText,
  topComponent,
  bottomComponent,
  includeMinWidthCalculation = true,
  mode = DroppedListOpenMode.CLICK,
  placement: placementProp = "bottom-start",
  itemSize,
  selectedItemIds = [],
  ignoreClickOutsideElements,
  items,
  margin: marginProp,
  children,
  onChange,
  onClose,
}: DroppedListInterface<any>) {
  const { placement, popperVisible, showPopper, hidePopper, initPopper } = usePopper({ placement: placementProp });
  const { style } = useVisibilityAnimation(popperVisible);

  useEffectSkipFirst(() => {
    if (popperVisible) return;
    if (!onClose) return;
    onClose();
  }, [popperVisible]);

  const Component = ComponentByOpenMode[mode];
  const toggle = toggleByOpenMode[mode];

  const renderChild = (clickOutsideRef: any) =>
    children(
      {
        open: showPopper,
        close: hidePopper,
        opened: popperVisible,
        toggle: () => toggle(popperVisible, showPopper, hidePopper),
      },
      provideRef(clickOutsideRef, initPopper("parent")),
      <>
        {popperVisible && (
          <Wrapper
            as={animated.div}
            style={style}
            ref={initPopper("child")}
            styles={[
              cursor("default"),
              maxWidth(480),
              minWidth("100%"),
              includeMinWidthCalculation && minWidth("calc(100% + 40px)"),
              zIndex_popup,
            ]}
            onClick={stopPropagation()}
          >
            <Wrapper
              styles={[
                getPopperMarginStyleForPlacement(placement, marginProp),
                backgroundColor("white"),
                boxShadow(...elevation16Raw, [0, 0, 0, 1, "gray-blue/02"]),
                borderRadius(6),
                padding("4px 8px"),
              ]}
            >
              {topComponent}
              {items ? (
                <List
                  emptyText={emptyText}
                  itemSize={itemSize}
                  titleDots
                  activeItemIds={selectedItemIds}
                  items={items}
                  onClick={(id) => onChange(id, hidePopper)}
                />
              ) : null}
              {bottomComponent}
            </Wrapper>
          </Wrapper>
        )}
      </>,
    );

  return (
    <Component
      ignoreHtmlClickElements={ignoreClickOutsideElements}
      opened={popperVisible}
      open={showPopper}
      close={hidePopper}
    >
      {renderChild}
    </Component>
  );
}

export default React.memo(DroppedList) as <ITEM extends string | number>(
  props: DroppedListInterface<ITEM>,
) => JSX.Element;
