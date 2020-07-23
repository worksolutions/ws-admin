import React from "react";
import { HeaderGroup, UseResizeColumnsColumnProps } from "react-table";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";

import { flex } from "libs/styles";

import { UseSortingType } from "../../libs";
import { useResizeTableHead } from "../../libs/resizeHook";

import HeaderColumn from "./HeaderColumn";

export type HeaderGroupInterface = { headers: (UseResizeColumnsColumnProps<any> & HeaderGroup<any>)[] } & HeaderGroup<
  any
>;

interface HeaderInterface {
  id: string;
  trHeaderGroup: HeaderGroupInterface;
  sorting: UseSortingType;
  onResizeHover: (index: number) => void;
}

function Header({ trHeaderGroup, sorting, id, onResizeHover }: HeaderInterface) {
  const { headerRef, fixedSizes, headerWidths } = useResizeTableHead(id, trHeaderGroup.headers);
  return (
    <Wrapper as="thead">
      <Wrapper as="tr" {...trHeaderGroup.getHeaderGroupProps()} ref={headerRef} styles={fixedSizes && flex}>
        {trHeaderGroup.headers.map((header, index) => (
          <HeaderColumn
            key={header.getHeaderProps().key}
            fixedSizes={fixedSizes}
            width={headerWidths[index]}
            headerColumn={header}
            sorting={sorting}
            onResizeHover={(hovered) => onResizeHover(hovered ? index : -1)}
          />
        ))}
      </Wrapper>
    </Wrapper>
  );
}

export default observer(Header);
