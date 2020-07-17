import React from "react";
import { HeaderGroup, UseResizeColumnsColumnProps } from "react-table";

import Wrapper from "primitives/Wrapper";

import { UseSortingType } from "../../libs";

import HeaderColumn from "./HeaderColumn";

export type HeaderGroupInterface = { headers: (UseResizeColumnsColumnProps<any> & HeaderGroup<any>)[] } & HeaderGroup<
  any
>;

export default React.memo(function ({
  trHeaderGroup,
  sorting,
  onResize,
}: {
  trHeaderGroup: HeaderGroupInterface;
  sorting: UseSortingType;
  onResize: (index: number) => void;
}) {
  return (
    <Wrapper as="thead">
      <Wrapper as="tr" {...trHeaderGroup.getHeaderGroupProps()}>
        {trHeaderGroup.headers.map((header, index) => (
          <HeaderColumn
            key={header.getHeaderProps().key}
            headerColumn={header}
            sorting={sorting}
            onResize={(hovered) => onResize(hovered ? index : -1)}
          />
        ))}
      </Wrapper>
    </Wrapper>
  );
});
