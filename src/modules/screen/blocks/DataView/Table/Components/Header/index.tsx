import React from "react";
import { HeaderGroup, UseResizeColumnsColumnProps } from "react-table";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";

import { backgroundColor, flex, fullWidth, zIndex } from "libs/styles";
import { tableZIndexes } from "libs/styles/zIndexes";

import { UseSortingType } from "../../libs";

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
  const { headerRef, fixedSizes, headerWidths } = useResizeTableMain(id, trHeaderGroup.headers);
  return (
    <Wrapper as="thead" styles={tableZIndexes.thead}>
      <Wrapper
        as="tr"
        {...trHeaderGroup.getHeaderGroupProps()}
        ref={headerRef}
        styles={[fullWidth, fixedSizes && flex]}
      >
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
      </Wrapper>
    </Wrapper>
  );
}

export default observer(Header);
