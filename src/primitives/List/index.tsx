import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import { Colors, firstChild, flex, flexColumn, lastChild, marginBottom, marginTop } from "libs/styles";

import ListItem, { getItemStyles, ListItemInterface, ListItemSize } from "./ListItem";

export type ListItemId = string | number;

interface ListInterface<ITEM extends string | number> {
  itemSize?: ListItemSize;
  emptyText?: string;
  outerStyles?: any;
  titleStyles?: any;
  titleDots?: boolean;
  dividerColor?: Colors;
  activeItemIds: (ITEM | null | undefined)[];
  items: ListItemInterface<ITEM>[];
  onClick?: (id: ITEM) => void;
}

function List({
  outerStyles,
  itemSize = ListItemSize.LARGE,
  emptyText,
  activeItemIds,
  titleDots,
  titleStyles,
  items,
  onClick,
}: ListInterface<any>) {
  return (
    <Wrapper styles={[flex, flexColumn, outerStyles, firstChild(marginTop(4)), lastChild(marginBottom(4))]}>
      {items.length === 0 && emptyText ? (
        <Wrapper styles={getItemStyles(itemSize, false, false)}>
          <Typography color="gray-blue/03" noWrap>
            {emptyText}
          </Typography>
        </Wrapper>
      ) : (
        items.map((item) => (
          <ListItem
            key={item.code}
            itemSize={itemSize}
            titleDots={titleDots}
            titleStyles={titleStyles}
            item={item}
            isActiveItem={activeItemIds.includes(item.code)}
            onClick={onClick}
          />
        ))
      )}
    </Wrapper>
  );
}

List.defaultProps = {
  dividerColor: "gray-blue/02",
};

export default React.memo(List) as <ITEM extends string | number>(props: ListInterface<ITEM>) => JSX.Element;
