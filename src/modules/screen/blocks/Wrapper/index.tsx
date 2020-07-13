import React from "react";

import Wrapper from "primitives/Wrapper";

import { flexValue, margin, padding } from "libs/styles";

import BlockRenderer from "../../BlockRenderer";

import { BlockInterface } from "state/systemState";

function WrapperBlock({
  options,
}: BlockInterface<{ padding?: any; margin?: any; fullWidth?: boolean; blocks: BlockInterface[] }>) {
  return (
    <Wrapper
      styles={[
        options!.padding && padding(options!.padding),
        options!.margin && margin(options!.margin),
        options!.fullWidth && flexValue(1),
      ]}
    >
      {options!.blocks.map((item, key) => (
        <BlockRenderer key={key} {...item} />
      ))}
    </Wrapper>
  );
}

export default React.memo(WrapperBlock);
