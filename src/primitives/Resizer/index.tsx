import React, { Ref } from "react";
import { animated, to, useSpring } from "react-spring";
import { useGesture } from "react-with-gesture";
import { elevation8 } from "style/shadows";
import { duration200 } from "layout/durations";
import { useLocalStorage } from "react-use";

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

import BackdropDisabler from "../BackdropDisabler";

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

function calculateStyleParams(
  down: boolean,
  data: { delta: number[]; currentWidth: number; minWidthToAutoClose: number },
) {
  const newWidth = down ? data.delta[0] + data.currentWidth : data.currentWidth;
  const childWidth = Math.max(minResizerWidth, newWidth);
  const childOpacity = childWidth < data.minWidthToAutoClose ? 0 : 1;

  return { newWidth, child: { childWidth, childOpacity } };
}

const Resizer = React.forwardRef(function (
  { initialWidth, children, styles, minWidthToAutoClose = 72, localStorageKey }: ResizerInterface,
  ref: Ref<HTMLElement>,
) {
  const [currentWidth, setCurrentWidth] = localStorageKey
    ? useLocalStorage(localStorageKey, initialWidth)
    : React.useState(initialWidth);
  const [bind, { delta, down }] = useGesture();

  const styleParams = calculateStyleParams(down, { currentWidth: currentWidth!, delta, minWidthToAutoClose }).child;
  const { childWidth, childOpacity } = useSpring(styleParams);

  React.useEffect(() => {
    if (down) return;
    const { newWidth, child } = calculateStyleParams(true, { currentWidth: currentWidth!, delta, minWidthToAutoClose });
    setCurrentWidth(child.childOpacity === 1 ? newWidth : minResizerWidth);
  }, [down]);

  function showClosedContent() {
    setCurrentWidth(initialWidth);
  }

  return (
    <>
      <Wrapper ref={ref} styles={[position("relative"), flex, styles]}>
        <Wrapper as={animated.div} style={{ width: childWidth, opacity: childOpacity }}>
          {children}
        </Wrapper>
        <Wrapper
          as={animated.div}
          {...bind()}
          styles={[
            position("absolute"),
            top(0),
            bottom(0),
            cursor("ew-resize"),
            width(16),
            down && child(backgroundColor("blue/05"), "> *"),
            hover(child(backgroundColor("blue/05"), "> *")),
          ]}
          style={{ left: to([childWidth], (x) => `${x - 8}px`) }}
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
      {down && <BackdropDisabler />}
    </>
  );
});

export default React.memo(Resizer);
