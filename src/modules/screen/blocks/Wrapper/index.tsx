import React from "react";

import Wrapper from "primitives/Wrapper";

import { flexValue, margin, padding } from "libs/styles";

import BlockRenderer from "../../BlockRenderer";

import { BlockInterface, ContainBlocksInterface } from "state/systemState";

function WrapperBlock({
  options,
  blocks,
}: BlockInterface<{ padding?: any; margin?: any; fullWidth?: boolean }> & ContainBlocksInterface) {
  return (
    <Wrapper
      styles={[
        options!.padding && padding(options!.padding),
        options!.margin && margin(options!.margin),
        options!.fullWidth && flexValue(1),
      ]}
    >
      {blocks.map((item, key) => (
        <BlockRenderer key={key} {...item} />
      ))}
    </Wrapper>
  );
}

export default React.memo(WrapperBlock);
