import React from "react";
import { propEq } from "ramda";
import { duration200 } from "layout/durations";
import { observer } from "mobx-react-lite";
import { componentZIndexes } from "layout/zIndexes";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import { ListItemId } from "primitives/List";
import Icon from "primitives/Icon";
import DroppedList from "primitives/List/DroppedList";

import {
  ai,
  Aligns,
  backgroundColor,
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
  width,
} from "libs/styles";

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

function findItem(items: SortingInterface["items"], id: ListItemId) {
  return items.find(propEq("id", id));
}

function Sorting({ items, selected, styles, onChange }: SortingInterface) {
  const originalSelectedElement = React.useMemo(() => findItem(items, selected.id), [selected])!;
  const listRef = React.useRef<HTMLElement>();

  return (
    <DroppedList
      ignoreClickOutsideElements={[listRef.current]}
      margin={8}
      items={items.map((item) => ({
        id: item.id,
        title: item.title,
        rightContent:
          originalSelectedElement.id === item.id ? (
            <Icon icon="check" color="blue/06" />
          ) : (
            <Wrapper styles={width(24)} />
          ),
      }))}
      onChange={(id, close) => {
        close();
        const item = findItem(items, id)!;
        if (item === originalSelectedElement) return;
        onChange(item.id, item.hasDirection ? SortingDirection.DESC : null);
      }}
    >
      {({ toggle }, parentRef, droppedList) => (
        <Wrapper ref={parentRef} styles={[flex, ai(Aligns.END), position("relative"), styles]}>
          <Button
            styles={[
              boxShadow([0, 0, 0, 1, "gray-blue/02"]),
              originalSelectedElement.hasDirection && borderRadius("6px 0 0 6px"),
              focus(componentZIndexes.sortingButtonsOnFocus),
            ]}
            type={ButtonType.SECONDARY}
            size={ButtonSize.MEDIUM}
            onClick={toggle}
          >
            {originalSelectedElement.title}
          </Button>
          {originalSelectedElement.hasDirection && (
            <>
              <Wrapper styles={[fullHeight, width(1), backgroundColor("gray-blue/02")]} />
              <Button
                styles={[
                  backgroundColor("white"),
                  boxShadow([0, 0, 0, 1, "gray-blue/02"]),
                  borderRadius("0 6px 6px 0"),
                  padding(8),
                  ai(Aligns.CENTER),
                  focus(componentZIndexes.sortingButtonsOnFocus),
                  child(
                    [
                      transition(`all ${duration200}`),
                      transform(selected.direction === SortingDirection.DESC ? "rotateZ(0deg)" : "scale(1, -1)"),
                    ],
                    ".icon",
                  ),
                ]}
                iconLeft="sort-desc"
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
          {droppedList}
        </Wrapper>
      )}
    </DroppedList>
  );
}

export default React.memo(observer(Sorting));
