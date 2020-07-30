import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Spinner from "primitives/Spinner";

import { useEventEmitter } from "libs/events";
import { useForceUpdate } from "libs/hooks";

import globalEventBus from "modules/globalEventBus";

import { loadBlockComponent } from "./libs";

import { BlockInterface } from "state/systemState";

const renderedElements: Record<string, boolean> = {};

globalEventBus.on("BLOCK_WAS_RENDERED", ({ id, rendered }) => {
  renderedElements[id] = rendered;
});

function BlockRenderer(props: BlockInterface & { styles?: any; type?: string }) {
  const [BlockComponent, setBlockComponent] = useState<FC<BlockInterface>>();
  const update = useForceUpdate();

  if (props.waitForId) {
    useEventEmitter(globalEventBus, "BLOCK_WAS_RENDERED", (payload) => {
      if (payload.id === props.waitForId && payload.rendered) update();
    });
  }

  useEffect(() => {
    loadBlockComponent(props.type!, (value) => {
      setBlockComponent(value);
      if (props.id) globalEventBus.emit("BLOCK_WAS_RENDERED", { rendered: true, id: props.id });
    });

    return () => {
      if (props.id) globalEventBus.emit("BLOCK_WAS_RENDERED", { rendered: false, id: props.id });
    };
  }, []);

  if (!BlockComponent) {
    return <Spinner size={78} />;
  }

  if (props.waitForId) {
    if (!renderedElements[props.waitForId]) return <Spinner size={78} />;
  }

  return <BlockComponent {...props} />;
}

export default React.memo(observer(BlockRenderer));
