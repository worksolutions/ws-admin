import React from "react";

import Wrapper from "primitives/Wrapper";

import { flex } from "libs/styles";
import { flexValue } from "libs/styles";

import BlockRenderer from "../../BlockRenderer";

import { ContainBlocksInterface } from "state/systemState";

function FullWidthWrapper({ blocks }: ContainBlocksInterface) {
  return (
    <Wrapper styles={[flex, flexValue(1)]}>
      {blocks.map((item, key) => (
        <BlockRenderer key={key} {...item} />
      ))}
    </Wrapper>
  );
}

export default React.memo(FullWidthWrapper);
