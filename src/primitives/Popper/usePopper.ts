import React from "react";
import { createPopper, Instance } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";
import { PositioningStrategy } from "@popperjs/core/lib/types";

const initialData: PopperConfigInterface = {
  placement: "auto",
  strategy: "absolute",
  padding: 8,
};

export interface PopperConfigInterface {
  placement?: Placement;
  strategy?: PositioningStrategy;
  padding?: number;
}

function getPopperData(inputData?: PopperConfigInterface) {
  inputData = inputData || initialData;
  return {
    placement: inputData.placement || initialData.placement,
    strategy: inputData.strategy || initialData.strategy,
    padding: inputData.padding || initialData.padding,
  };
}

export default function usePopper(data?: PopperConfigInterface) {
  const { placement, strategy } = getPopperData(data);
  const [parent, setParent] = React.useState<HTMLElement>();
  const [child, setChild] = React.useState<HTMLElement>();
  const [instance, setInstance] = React.useState<Instance | undefined>();

  const destroy = () => {
    if (!instance) return;
    instance.destroy();
    setInstance(undefined);
  };

  React.useEffect(() => {
    if (!child) return destroy;
    if (!parent) return destroy;
    const instance = createPopper(parent, child, {
      placement,
      strategy,
    });
    setInstance(instance);
    return destroy;
  }, [parent, child]);

  return (forObject: "parent" | "child") => (ref: HTMLElement) => {
    if (!ref) return;
    if (forObject === "child") {
      setChild(ref);
      return;
    }
    setParent(ref);
  };
}
