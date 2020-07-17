import React from "react";
import { Row } from "react-table";

import Wrapper from "primitives/Wrapper";

import { borderRight, padding } from "libs/styles";

export default function ({ row, resizingColumnIndex }: { row: Row<any>; resizingColumnIndex: number }) {
  return (
    <Wrapper as="tr" {...row.getRowProps()}>
      {row.cells.map((cell, index) => {
        const { key, ...props } = cell.getCellProps();
        return (
          <Wrapper
            as="td"
            key={key}
            {...props}
            styles={[
              padding("10px 16px"),
              borderRight(1, resizingColumnIndex === index ? "gray-blue/02" : "transparent"),
            ]}
          >
            {cell.render("Cell")}
          </Wrapper>
        );
      })}
    </Wrapper>
  );
}
