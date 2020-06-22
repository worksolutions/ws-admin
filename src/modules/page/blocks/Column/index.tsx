import React from "react";

import Wrapper from "primitives/Wrapper";

import { ai, Aligns, flex, flexColumn, flexValue } from "libs/styles";

import BlockRenderer from "../../BlockRenderer";

import { BlockInterface } from "state/systemState";

interface ColumnInterface {
  block: { blocks: BlockInterface[] };
}

function Column({ block }: ColumnInterface) {
  return (
    <Wrapper styles={[flex, flexColumn, ai(Aligns.STRETCH), flexValue(1)]}>
      {block.blocks.map((item, key) => (
        <BlockRenderer key={key} block={item} />
      ))}
    </Wrapper>
  );
}

export default React.memo(Column);
