import React, { FC, useEffect, useState } from "react";

import Spinner from "primitives/Spinner";

import { loadBlockComponent } from "../libs";

import { BlockInterface } from "state/systemState";

interface BlockRenderInterface {
  block: BlockInterface;
}

function BlockRenderer({ block }: BlockRenderInterface) {
  const [BlockComponent, setBlockComponent] = useState<FC<BlockRenderInterface>>();
  useEffect(() => {
    loadBlockComponent(block.type, setBlockComponent);
  }, []);

  if (!BlockComponent) {
    return <Spinner size={78} />;
  }

  return <BlockComponent block={block} />;
}

export default React.memo(BlockRenderer);
