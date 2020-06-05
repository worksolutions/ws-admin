import React from "react";
import { useSpring, to, animated } from "react-spring";
import { useGesture } from "react-with-gesture";

import Wrapper from "primitives/Wrapper";

import { backgroundColor, position, width, top, bottom, cursor, flex, fullHeight, marginLeft, left } from "libs/styles";

import BackdropDisabler from "../BackdropDisabler";

interface ResizerInterface {
  initialWidth: number;
  children: JSX.Element;
  minWidthToAutoClose?: number;
  styles?: any;
}

const minResizerWidth = 24;

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

  function showClosed() {
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
        {styleParams.childOpacity === 0 && (
          <Wrapper styles={[position("absolute"), left(0), top("50%")]}>
            <button onClick={showClosed}>123</button>
          </Wrapper>
        )}
      </Wrapper>
      {down && <BackdropDisabler />}
    </>
  );
}

export default React.memo(Resizer);
