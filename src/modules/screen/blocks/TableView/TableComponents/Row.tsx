import React from "react";
import { Row } from "react-table";

import Wrapper from "primitives/Wrapper";

import { padding } from "libs/styles";

export default React.memo(function ({ row }: { row: Row<any> }) {
  return (
    <Wrapper as="tr" {...row.getRowProps()}>
      {row.cells.map((cell) => {
        const { key, ...props } = cell.getCellProps();
        return (
          <Wrapper as="td" key={key} {...props} styles={[padding("10px 16px")]}>
            {cell.render("Cell")}
          </Wrapper>
        );
      })}
    </Wrapper>
  );
});
