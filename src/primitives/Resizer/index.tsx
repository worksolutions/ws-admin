import React from "react";
import { animated, to, useSpring } from "react-spring";
import { useGesture } from "react-with-gesture";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import {
  backgroundColor,
  bottom,
  boxShadow,
  createAlphaColor,
  cursor,
  flex,
  fullHeight,
  left,
  marginLeft,
  position,
  top,
  width,
} from "libs/styles";

import BackdropDisabler from "../BackdropDisabler";

interface ResizerInterface {
  initialWidth: number;
  children: JSX.Element;
  minWidthToAutoClose?: number;
  styles?: any;
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

function Resizer({ initialWidth, children, styles, minWidthToAutoClose = 72 }: ResizerInterface) {
  const [currentWidth, setCurrentWidth] = React.useState(initialWidth);
  const [bind, { delta, down }] = useGesture();

  const styleParams = calculateStyleParams(down, { currentWidth, delta, minWidthToAutoClose }).child;
  const { childWidth, childOpacity } = useSpring(styleParams);

  React.useEffect(() => {
    if (down) return;
    const { newWidth, child } = calculateStyleParams(true, { currentWidth, delta, minWidthToAutoClose });
    setCurrentWidth(child.childOpacity === 1 ? newWidth : minResizerWidth);
  }, [down]);

  function showClosedContent() {
    setCurrentWidth(initialWidth);
  }

  return (
    <>
      <Wrapper styles={[position("relative"), flex, styles]}>
        <Wrapper as={animated.div} style={{ width: childWidth, opacity: childOpacity }}>
          {children}
        </Wrapper>
        <Wrapper
          as={animated.div}
          {...bind()}
          styles={[position("absolute"), top(0), bottom(0), cursor("ew-resize"), width(8)]}
          style={{ left: to([childWidth], (x) => `${x - 4}px`) }}
        >
          <Wrapper as={animated.div} styles={[backgroundColor("gray-blue/02"), width(1), fullHeight, marginLeft(4)]} />
        </Wrapper>
        {styleParams.childOpacity === 0 && !down && (
          <Wrapper styles={[position("absolute"), left(buttonShowClosedContentLeft), top("50%")]}>
            <Button
              styles={[
                boxShadow(
                  [0, 4, 8, createAlphaColor("black", 10)],
                  [0, 16, 24, createAlphaColor("black", 10)],
                  [0, 24, 32, createAlphaColor("black", 10)],
                ),
              ]}
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
}

export default React.memo(Resizer);
