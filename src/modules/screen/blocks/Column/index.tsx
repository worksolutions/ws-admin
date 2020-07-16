import React from "react";

import Wrapper from "primitives/Wrapper";

import { flex, flexColumn } from "libs/styles";

import BlockRenderer from "../../BlockRenderer";

import { ContainBlocksInterface } from "state/systemState";

function Column({ blocks }: ContainBlocksInterface) {
  return (
    <Wrapper styles={[flex, flexColumn]}>
      {blocks.map((item, key) => (
        <BlockRenderer key={key} {...item} />
      ))}
    </Wrapper>
  );
}

export default React.memo(Column);
