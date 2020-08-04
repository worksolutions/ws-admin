import React from "react";

import Wrapper from "primitives/Wrapper";

import { flex, flexColumn } from "libs/styles";

import BlocksList from "../BlocksList";

import { ContainBlocksInterface } from "state/globalState";

function Column({ blocks, styles }: ContainBlocksInterface & { styles?: any }) {
  return (
    <Wrapper styles={[flex, flexColumn, styles]}>
      <BlocksList blocks={blocks} />
    </Wrapper>
  );
}

export default React.memo(Column);
