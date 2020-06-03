import React, { useState } from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import { useBoolean } from "libs/hooks";
import { backgroundColor, border, borderRadius, opacity, padding, transition } from "libs/styles";

import usePopper, { PopperConfigInterface } from "./usePopper";

interface HintInterface {
  text?: string;
  inline?: boolean;
  showDelay?: number;
  popperConfig?: PopperConfigInterface;
  children: (initParent: (ref: HTMLElement) => void, hint?: React.ReactNode) => JSX.Element;
}

const hideAnimationDelay = 200;

function Hint({ children, showDelay, popperConfig, text, inline }: HintInterface) {
  const initPopper = usePopper(popperConfig);
  const [opened, open, close] = useBoolean(false);
  const [wasRendered, enableWasRendered, disableWasRendered] = useBoolean(false);
  const [element, setElement] = useState<HTMLElement>();

  const initParent = (ref: HTMLElement) => {
    initPopper("parent")(ref);
    if (!ref) return;
    setElement(ref);
  };

  React.useEffect(() => {
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

  const hint =
    wasRendered && !!text ? (
      <Wrapper
        ref={initPopper("child")}
        styles={[
          opacity(opened ? 1 : 0),
          transition(`opacity ${hideAnimationDelay}ms`),
          padding("4px 8px"),
          backgroundColor("blue/10"),
          borderRadius(4),
          border(1, "gray-blue/03"),
        ]}
      >
        <Typography type="caption-regular" color="white">
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

export default React.memo(Hint);
