import React, { Ref } from "react";
import { animated, to } from "react-spring";
import { elevation8 } from "style/shadows";
import { duration160 } from "layout/durations";
import { useHover } from "react-use";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import {
  absoluteCenter,
  backgroundColor,
  bottom,
  child,
  cursor,
  flex,
  fullHeight,
  hover,
  left,
  marginLeft,
  position,
  top,
  transform,
  transition,
  visibility,
  width,
} from "libs/styles";

import { useResizer } from "./useResizer";

interface ResizerInterface {
  initialWidth: number;
  children: JSX.Element;
  minWidthToAutoClose?: number;
  styles?: any;
  localStorageKey?: string;
}

const minResizerWidth = 24;

const Resizer = React.forwardRef(function (
  { initialWidth, children, styles, minWidthToAutoClose = 72, localStorageKey }: ResizerInterface,
  ref: Ref<HTMLElement>,
) {
  const {
    down,
    childContentStyles,
    contentIsClosed,
    showContent,
    hideContent,
    getResizingLineProps,
    backdropDisabler,
  } = useResizer({
    initialWidth,
    localStorageKey,
    minResizerWidth,
    minWidthToAutoClose,
  });

  const [hoverLine] = useHover((hovered) => {
    return (
      <Wrapper
        styles={[
          down && child(backgroundColor("blue/05"), ".border-line"),
          hover(child(backgroundColor("blue/05"), ".border-line")),
        ]}
      >
        <Wrapper
          as={animated.div}
          {...getResizingLineProps()}
          styles={[position("absolute"), top(0), bottom(0), cursor("ew-resize"), width(16)]}
          style={{ left: to([childContentStyles.width], (x) => `${x - 8}px`) }}
        >
          <Wrapper
            className="border-line"
            as={animated.div}
            styles={[
              transition(`background-color ${duration160}`),
              backgroundColor("gray-blue/02"),
              width(1),
              fullHeight,
              marginLeft(8),
            ]}
          />
        </Wrapper>

        <Wrapper
          as={animated.div}
          style={{ left: childContentStyles.width }}
          styles={[absoluteCenter, visibility(contentIsClosed ? "visible" : hovered || down ? "visible" : "hidden")]}
        >
          <Button
            styles={[
              elevation8,
              backgroundColor("white"),
              child(
                [transition(`transform ${duration160}`), transform(`rotateZ(${contentIsClosed ? "0deg" : "180deg"})`)],
                ".icon",
              ),
            ]}
            type={ButtonType.ICON}
            size={ButtonSize.MEDIUM}
            iconLeft="arrow-right"
            onClick={contentIsClosed ? showContent : hideContent}
          />
        </Wrapper>
      </Wrapper>
    );
  });

  return (
    <>
      <Wrapper ref={ref} styles={[position("relative"), flex, styles]}>
        <Wrapper as={animated.div} style={childContentStyles}>
          {children}
        </Wrapper>
        {hoverLine}
      </Wrapper>
      {backdropDisabler}
    </>
  );
});

export default React.memo(Resizer);
