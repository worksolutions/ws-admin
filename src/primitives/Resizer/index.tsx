import React, { Ref } from "react";
import { animated, to } from "react-spring";
import { elevation8 } from "style/shadows";
import { duration200 } from "layout/durations";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import {
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
  transition,
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
const buttonShowClosedContentWidth = 32;

const buttonShowClosedContentLeft = minResizerWidth - buttonShowClosedContentWidth / 2;

const Resizer = React.forwardRef(function (
  { initialWidth, children, styles, minWidthToAutoClose = 72, localStorageKey }: ResizerInterface,
  ref: Ref<HTMLElement>,
) {
  const {
    down,
    childContentStyles,
    styleParams,
    showClosedContent,
    getResizingLineProps,
    backdropDisabler,
  } = useResizer({
    initialWidth,
    localStorageKey,
    minResizerWidth,
    minWidthToAutoClose,
  });

  return (
    <>
      <Wrapper ref={ref} styles={[position("relative"), flex, styles]}>
        <Wrapper as={animated.div} style={childContentStyles}>
          {children}
        </Wrapper>
        <Wrapper
          as={animated.div}
          {...getResizingLineProps()}
          styles={[
            position("absolute"),
            top(0),
            bottom(0),
            cursor("ew-resize"),
            width(16),
            down && child(backgroundColor("blue/05"), "> *"),
            hover(child(backgroundColor("blue/05"), "> *")),
          ]}
          style={{ left: to([childContentStyles.width], (x) => `${x - 8}px`) }}
        >
          <Wrapper
            as={animated.div}
            styles={[
              transition(`background-color ${duration200}`),
              backgroundColor("gray-blue/02"),
              width(1),
              fullHeight,
              marginLeft(8),
            ]}
          />
        </Wrapper>
        {styleParams.childOpacity === 0 && !down && (
          <Wrapper styles={[position("absolute"), left(buttonShowClosedContentLeft), top("50%")]}>
            <Button
              styles={[elevation8, backgroundColor("white")]}
              type={ButtonType.ICON}
              size={ButtonSize.MEDIUM}
              iconLeft="arrow-right"
              onClick={showClosedContent}
            />
          </Wrapper>
        )}
      </Wrapper>
      {backdropDisabler}
    </>
  );
});

export default React.memo(Resizer);
