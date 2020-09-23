import { useSpring } from "react-spring";
import { duration160Number } from "layout/durations";

import { useBoolean } from "libs/hooks/common";

export function useVisibilityAnimation(opened: boolean, duration = duration160Number) {
  const spring = useSpring({
    config: { duration },
    opacity: opened ? 1 : 0,
  });

  return {
    style: {
      opacity: spring.opacity,
      visibility: spring.opacity.to((value) => (value === 0 ? "hidden" : "visible")),
    },
  };
}
