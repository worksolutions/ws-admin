import React, { FC, useEffect, useState } from "react";

import Spinner from "primitives/Spinner";

import { loadBlockComponent } from "../libs";

import { BlockInterface } from "state/systemState";

function BlockRenderer(props: BlockInterface) {
  const [BlockComponent, setBlockComponent] = useState<FC<BlockInterface>>();

  useEffect(() => {
    loadBlockComponent(props.type, setBlockComponent);
  }, []);

  if (!BlockComponent) {
    return <Spinner size={78} />;
  }

  return <BlockComponent {...props} />;
}

export default React.memo(BlockRenderer);
