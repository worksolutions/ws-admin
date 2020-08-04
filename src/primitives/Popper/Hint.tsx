import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  backgroundColor,
  border,
  borderRadius,
  boxShadow,
  Colors,
  createAlphaColor,
  opacity,
  padding,
  transition,
  whiteSpace,
} from "libs/styles";
import { useBoolean } from "libs/hooks/common";

import usePopper, { getPopperMarginStyleForPlacement, PopperConfigInterface } from "./usePopper";

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
        [0, 0, 2, 0, createAlphaColor("black", 15)],
        [0, 4, 8, 0, createAlphaColor("black", 20)],
        [0, 0, 2, 0, "gray-blue/02"],
      ),
    ],
    text: {
      color: "gray-blue/09" as Colors,
    },
  },
};

function Hint({
  force,
  children,
  showDelay,
  popperConfig,
  text,
  inline,
  showOnHover = true,
  type = HintType.black,
  margin: marginProp,
}: HintInterface) {
  const { initPopper, placement } = usePopper(popperConfig);
  const [opened, open, close] = useBoolean(() => !showOnHover);
  const [wasRendered, enableWasRendered, disableWasRendered] = useBoolean(() => !showOnHover);
  const [element, setElement] = useState<HTMLElement>();

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
          getPopperMarginStyleForPlacement(placement, marginProp!),
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
  margin: 8,
};

export default React.memo(observer(Hint));
