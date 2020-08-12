import { useSpring } from "react-spring";
import { duration200Number } from "layout/durations";

import { useBoolean } from "libs/hooks/common";

export function useVisibilityAnimation(duration = duration200Number) {
  const [opened, open, close] = useBoolean(false);

  const spring = useSpring({
    config: { duration },
    opacity: opened ? 1 : 0,
  });

  return {
    opened,
    open,
    close,
    style: {
      opacity: spring.opacity,
      visibility: spring.opacity.to((value) => (value === 0 ? "hidden" : "visible")),
    },
  };
}
