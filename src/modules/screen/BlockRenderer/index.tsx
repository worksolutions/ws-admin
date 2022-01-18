import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Loading from "components/LoadingContainer/Loading";

import { loadBlockComponent } from "./libs";

import { BlockInterface } from "state/globalState";

function BlockRenderer(props: BlockInterface & { styles?: any; type?: string; spinnerSize?: number }) {
  const [BlockComponent, setBlockComponent] = useState<FC<BlockInterface>>();
  useEffect(() => {
    loadBlockComponent(props.type!, (value) => {
      setBlockComponent(value);
    });
  }, []);

  if (!BlockComponent) {
    return <Loading />;
  }
  return <BlockComponent {...props} />;
}

export default React.memo(observer(BlockRenderer));
