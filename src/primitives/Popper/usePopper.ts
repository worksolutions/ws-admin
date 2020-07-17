import React from "react";
import { createPopper, Instance } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";
import { PositioningStrategy } from "@popperjs/core/lib/types";

import { marginBottom, marginLeft, marginRight, marginTop } from "libs/styles";

const initialData: PopperConfigInterface = {
  placement: "auto",
  strategy: "absolute",
};

export interface PopperConfigInterface {
  placement?: Placement;
  strategy?: PositioningStrategy;
}

function getPopperData(inputData?: PopperConfigInterface) {
  inputData = inputData || initialData;
  return {
    placement: inputData.placement || initialData.placement,
    strategy: inputData.strategy || initialData.strategy,
  };
}

export default function usePopper(data?: PopperConfigInterface) {
  const [parent, setParent] = React.useState<HTMLElement>();
  const [child, setChild] = React.useState<HTMLElement>();
  const [instance, setInstance] = React.useState<Instance | undefined>();
  const [placement, setPlacement] = React.useState<Placement>("bottom");

  const destroy = (inputInstance: Instance | undefined) => {
    if (!inputInstance) return;
    inputInstance.destroy();
    setInstance(undefined);
  };

  React.useEffect(() => {
    if (!child || !parent) return () => destroy(instance);
    const newInstance = createPopper(parent, child, getPopperData(data));
    setInstance(newInstance);
    return () => destroy(newInstance);
  }, [parent, child]);

  React.useEffect(() => {
    setTimeout(() => setPlacement(instance?.state.placement || "bottom"), 0);
  }, [instance]);

  return {
    placement,
    initPopper: (forObject: "parent" | "child") => (ref: HTMLElement | null) => {
      if (!ref) return;
      if (forObject === "child") {
        setChild(ref);
        return;
      }
      setParent(ref);
    },
  };
}

const makeMargin = (margin: number) => margin.toString() + "px !important";

const marginForPlacement: Record<string, (number: number) => any> = {
  left: (number) => marginRight(makeMargin(number)),
  right: (number) => marginLeft(makeMargin(number)),
  top: (number) => marginBottom(makeMargin(number)),
  bottom: (number) => marginTop(makeMargin(number)),
};

marginForPlacement["right-start"] = marginForPlacement.right;
marginForPlacement["right-end"] = marginForPlacement.right;
marginForPlacement["left-start"] = marginForPlacement.left;
marginForPlacement["left-end"] = marginForPlacement.left;
marginForPlacement["top-start"] = marginForPlacement.top;
marginForPlacement["top-end"] = marginForPlacement.top;
marginForPlacement["bottom-start"] = marginForPlacement.bottom;
marginForPlacement["bottom-end"] = marginForPlacement.bottom;

export function getPopperMarginStyleForPlacement(placement: string, marginProp: number) {
  if (placement in marginForPlacement) return marginForPlacement[placement](marginProp);
  return null;
}
