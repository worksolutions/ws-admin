import React from "react";

import Wrapper from "primitives/Wrapper";

import { flex, flexColumn } from "libs/styles";

import BlockRenderer from "../../BlockRenderer";

import { ContainBlocksInterface } from "state/systemState";

function BlocksList({ blocks, styles }: ContainBlocksInterface & { styles?: any }) {
  return (
    <>
      {blocks.map((item, key) => (
        <BlockRenderer key={key} {...item} styles={styles} />
      ))}
    </>
  );
}

export default React.memo(BlocksList);
