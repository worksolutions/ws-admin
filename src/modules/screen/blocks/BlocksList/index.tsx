import React from "react";

import BlockRenderer from "modules/screen/BlockRenderer";

import { ContainBlocksInterface } from "state/globalState";

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
