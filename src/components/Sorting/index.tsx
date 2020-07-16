import React from "react";
import { propEq } from "ramda";
import { animated, useSpring } from "react-spring";
import { duration200, duration200Number } from "layout/durations";
import { elevation16 } from "style/shadows";
import { observer } from "mobx-react-lite";

import HandleClickOutside from "primitives/HandleClickOutside";
import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import usePopper, { getPopperMarginStyleForPlacement } from "primitives/Popper/usePopper";
import List from "primitives/List";
import Icon from "primitives/Icon";

import {
  ai,
  Aligns,
  backgroundColor,
  border,
  borderRadius,
  boxShadow,
  child,
  flex,
  focus,
  fullHeight,
  padding,
  position,
  transform,
  transition,
  whiteSpace,
  width,
  zIndex,
} from "libs/styles";
import { useBoolean } from "libs/hooks";
import { provideRef } from "libs/provideRef";

import { SortingDirection, SortingID, SortingItem } from "types/Sorting";

export interface SortingElementInterface {
  id: SortingID;
  direction?: SortingDirection | null;
}

interface SortingInterface {
  styles?: any;
  selected: SortingElementInterface;
  items: SortingItem[];
  onChange: (id: SortingID, direction: SortingDirection | null) => void;
}

function findItem(items: SortingInterface["items"], element: SortingInterface["selected"]) {
  return items.find(propEq("id", element.id));
}

function Sorting({ items, selected, styles, onChange }: SortingInterface) {
  const originalSelectedElement = React.useMemo(() => findItem(items, selected), [selected])!;
  const [opened, open, close] = useBoolean(false);
  const listRef = React.useRef<HTMLElement>();

  const spring = useSpring({
    config: { duration: duration200Number },
    opacity: opened ? 1 : 0,
  });
  const { initPopper, placement } = usePopper({ placement: "bottom-start" });

  return (
    <Wrapper styles={[flex, ai(Aligns.CENTER), borderRadius(6), position("relative"), styles]}>
      <HandleClickOutside ignoreElements={[listRef.current]} onClickOutside={close}>
        {(ref) => (
          <Button
            ref={provideRef(initPopper("parent"), ref)}
            styles={[
              boxShadow([0, 0, 0, 1, "gray-blue/02"]),
              originalSelectedElement.hasDirection && borderRadius("6px 0 0 6px"),
              focus(zIndex(1)),
            ]}
            type={ButtonType.SECONDARY}
            size={ButtonSize.MEDIUM}
            onClick={() => (opened ? close() : open())}
          >
            {originalSelectedElement.title}
          </Button>
        )}
      </HandleClickOutside>
      {originalSelectedElement.hasDirection && (
        <>
          <Wrapper styles={[fullHeight, width(1), backgroundColor("gray-blue/02")]} />
          <Button
            styles={[
              boxShadow([0, 0, 0, 1, "gray-blue/02"]),
              borderRadius("0 6px 6px 0"),
              padding(8),
              ai(Aligns.CENTER),
              focus(zIndex(1)),
              child(
                [
                  transition(`all ${duration200}`),
                  transform(selected.direction === SortingDirection.DESC ? "rotateZ(0deg)" : "rotateZ(180deg)"),
                ],
                ".icon",
              ),
            ]}
            iconLeft="16-triangle-down-alt"
            iconLeftWidth={16}
            iconLeftHeight={16}
            type={ButtonType.ICON}
            size={ButtonSize.MEDIUM}
            onClick={() => {
              onChange(
                originalSelectedElement.id,
                selected.direction === SortingDirection.DESC ? SortingDirection.ASC : SortingDirection.DESC,
              );
            }}
          />
        </>
      )}
      <Wrapper
        as={animated.div}
        style={{
          opacity: spring.opacity,
          visibility: spring.opacity.to((value) => (value === 0 ? "hidden" : "visible")),
        }}
        ref={provideRef(listRef, initPopper("child"))}
      >
        <Wrapper
          styles={[
            getPopperMarginStyleForPlacement(placement, 8),
            backgroundColor("white"),
            border(1, "gray-blue/02"),
            elevation16,
            borderRadius(6),
          ]}
        >
          <List
            styles={padding("8px 8px 8px 0")}
            titleStyles={whiteSpace("nowrap")}
            items={items.map((item) => ({
              title: item.title,
              rightContent: originalSelectedElement.id === item.id ? <Icon iconName="check" color="blue/06" /> : null,
            }))}
            onClick={(index) => {
              close();
              const item = findItem(items, items[index])!;
              if (item === originalSelectedElement) return;
              onChange(item.id, item.hasDirection ? SortingDirection.DESC : null);
            }}
          />
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(observer(Sorting));
