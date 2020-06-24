import React from "react";

import Wrapper from "primitives/Wrapper";

import { ai, Aligns, flex, flexColumn, flexValue } from "libs/styles";

import BlockRenderer from "../../BlockRenderer";

import { BlockInterface } from "state/systemState";

function Column({ blocks }: { blocks: BlockInterface[] }) {
  return (
    <Wrapper styles={[flex, flexColumn, ai(Aligns.STRETCH), flexValue(1)]}>
      {blocks.map((item, key) => (
        <BlockRenderer key={key} {...item} />
      ))}
    </Wrapper>
  );
}

export default React.memo(Column);
