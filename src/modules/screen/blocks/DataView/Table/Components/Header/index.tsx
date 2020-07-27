import React from "react";
import { HeaderGroup, UseResizeColumnsColumnProps } from "react-table";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";

import { flex } from "libs/styles";

import { UseSortingType } from "../../libs";

import { useResizeTableHead } from "./resizeHook";
import HeaderColumn from "./HeaderColumn";

export type HeaderGroupInterface = { headers: (UseResizeColumnsColumnProps<any> & HeaderGroup<any>)[] } & HeaderGroup<
  any
>;

interface HeaderInterface {
  id: string;
  trHeaderGroup: HeaderGroupInterface;
  sorting: UseSortingType;
  className?: string;
  tableHeight: number;
}

function Header({ trHeaderGroup, sorting, id, className, tableHeight }: HeaderInterface) {
  const { headerRef, fixedSizes, headerWidths } = useResizeTableHead(id, trHeaderGroup.headers);
  return (
    <Wrapper as="thead" className={className}>
      <Wrapper as="tr" {...trHeaderGroup.getHeaderGroupProps()} ref={headerRef} styles={fixedSizes && flex}>
        {trHeaderGroup.headers.map((header, index) => (
          <HeaderColumn
            key={header.getHeaderProps().key}
            fixedSizes={fixedSizes}
            width={headerWidths[index]}
            headerColumn={header}
            sorting={sorting}
            tableHeight={tableHeight}
          />
        ))}
      </Wrapper>
    </Wrapper>
  );
}

export default observer(Header);
