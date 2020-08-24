import React from "react";
import { HeaderGroup, UseResizeColumnsColumnProps } from "react-table";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";

import { flex, fullWidth, maxWidth, width, zIndex } from "libs/styles";

import { UseSortingType } from "../../libs";
import { halfOfCellDefaultHorizontalPadding } from "../../libs/paddings";

import { useResizeTableMain } from "./resizeHook";
import HeaderColumn from "./HeaderColumn";

export type HeaderGroupInterface = { headers: (UseResizeColumnsColumnProps<any> & HeaderGroup<any>)[] } & HeaderGroup<
  any
>;

interface HeaderInterface {
  id: string;
  trHeaderGroup: HeaderGroupInterface;
  sorting: UseSortingType;
  tableHeight: number;
}

function Header({ trHeaderGroup, sorting, id, tableHeight }: HeaderInterface) {
  const { headerRef, fixedSizes, headerWidths } = useResizeTableMain(id, trHeaderGroup.headers, 1);

  return (
    <Wrapper as="thead" styles={zIndex(1)}>
      <Wrapper
        as="tr"
        {...trHeaderGroup.getHeaderGroupProps()}
        ref={headerRef}
        styles={[fullWidth, fixedSizes && flex]}
      >
        <Wrapper
          styles={[width(halfOfCellDefaultHorizontalPadding), maxWidth(halfOfCellDefaultHorizontalPadding)]}
          as="th"
        />
        {trHeaderGroup.headers.map((header, index) => (
          <HeaderColumn
            key={header.getHeaderProps().key}
            fixedSizes={fixedSizes}
            width={headerWidths[index]}
            zIndex={trHeaderGroup.headers.length - index}
            headerColumn={header}
            sorting={sorting}
            tableHeight={tableHeight}
          />
        ))}
        <Wrapper
          styles={[width(halfOfCellDefaultHorizontalPadding), maxWidth(halfOfCellDefaultHorizontalPadding)]}
          as="th"
        />
      </Wrapper>
    </Wrapper>
  );
}

export default observer(Header);
