import React from "react";

import Wrapper from "primitives/Wrapper";

import { flex, flexColumn } from "libs/styles";

import BlockRenderer from "../../BlockRenderer";

import { BlockInterface } from "state/systemState";

function Column({ options }: BlockInterface<BlockInterface[]>) {
  return (
    <Wrapper styles={[flex, flexColumn]}>
      {options!.map((item, key) => (
        <BlockRenderer key={key} {...item} />
      ))}
    </Wrapper>
  );
}

export default React.memo(Column);
