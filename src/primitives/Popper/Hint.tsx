import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import { useBoolean } from "libs/hooks";
import {
  backgroundColor,
  border,
  borderRadius,
  boxShadow,
  Colors,
  createAlphaColor,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  opacity,
  padding,
  transition,
  whiteSpace,
} from "libs/styles";

import usePopper, { PopperConfigInterface } from "./usePopper";

export enum HintType {
  white,
  black,
}

interface HintInterface {
  force?: boolean;
  text?: string | null;
  type?: HintType;
  inline?: boolean;
  showDelay?: number;
  popperConfig?: PopperConfigInterface;
  showOnHover?: boolean;
  margin?: number;
  children: (initParent: (ref: HTMLElement | null) => void, hint?: React.ReactNode) => JSX.Element;
}

const hideAnimationDelay = 200;

const styledForType = {
  [HintType.black]: {
    container: [padding("4px 8px"), backgroundColor("blue/10"), borderRadius(4), border(1, "gray-blue/03")],
    text: {
      color: "white" as Colors,
    },
  },
  [HintType.white]: {
    container: [
      padding("8px 12px"),
      backgroundColor("white"),
      borderRadius(4),
      boxShadow(
        [0, 0, 2, createAlphaColor("black", 15)],
        [0, 4, 8, createAlphaColor("black", 20)],
        [0, 0, 2, "gray-blue/02"],
      ),
    ],
    text: {
      color: "gray-blue/09" as Colors,
    },
  },
};

const makeMargin = (margin: number) => margin.toString() + "px !important";

const marginForPlacement: Record<string, (number: number) => any> = {
  left: (number) => marginRight(makeMargin(number)),
  right: (number) => marginLeft(makeMargin(number)),
  top: (number) => marginBottom(makeMargin(number)),
  bottom: (number) => marginTop(makeMargin(number)),
};

function getMarginForPlacement(placement: string, marginProp: number) {
  if (placement in marginForPlacement) return marginForPlacement[placement](marginProp);
  return null;
}

function Hint({
  force,
  children,
  showDelay,
  popperConfig,
  text,
  inline,
  showOnHover = true,
  type = HintType.black,
  margin: marginProp = 8,
}: HintInterface) {
  const { initPopper, instance } = usePopper(popperConfig);
  const [opened, open, close] = useBoolean(() => !showOnHover);
  const [wasRendered, enableWasRendered, disableWasRendered] = useBoolean(() => !showOnHover);
  const [element, setElement] = useState<HTMLElement>();
  const [placementStyle, setPlacementStyle] = useState<any>();
  useEffect(() => {
    if (!instance) return;
    setTimeout(() => {
      setPlacementStyle(getMarginForPlacement(instance.state.placement, marginProp));
    }, 0);
  }, [instance]);

  const initParent = (ref: HTMLElement | null) => {
    if (!ref) return;
    initPopper("parent")(ref);
    setElement(ref);
  };

  React.useEffect(() => {
    if (!showOnHover) return;
    if (!element) return;

    let showTimer: any;
    let hideTimer: any;

    const mouseEnterHandler = () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      showTimer = setTimeout(() => {
        enableWasRendered();
        open();
      }, showDelay);
    };

    const mouseLeaveHandler = () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(disableWasRendered, hideAnimationDelay);
      close();
    };

    element.addEventListener("mouseenter", mouseEnterHandler);
    element.addEventListener("mouseleave", mouseLeaveHandler);

    return () => {
      element.removeEventListener("mouseenter", mouseEnterHandler);
      element.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, [close, disableWasRendered, element, enableWasRendered, open, showDelay]);

  const themeStyles = styledForType[type];

  const hint =
    force || (wasRendered && !!text) ? (
      <Wrapper
        ref={initPopper("child")}
        styles={[
          opacity(force || opened ? 1 : 0),
          transition(`opacity ${hideAnimationDelay}ms`),
          placementStyle,
          themeStyles.container,
        ]}
      >
        <Typography type="caption-regular" color={themeStyles.text.color} styles={[whiteSpace("nowrap")]}>
          {text}
        </Typography>
      </Wrapper>
    ) : null;

  if (inline) return children(initParent, hint);

  return (
    <>
      {children(initParent)}
      {hint}
    </>
  );
}

Hint.defaultProps = {
  showDelay: 200,
};

export default React.memo(observer(Hint));
