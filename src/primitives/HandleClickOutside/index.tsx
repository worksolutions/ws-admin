import React from "react";
import { useClickAway } from "react-use";

export interface HandleClickOutsideInterface {
  onClickOutside: () => void;
  enabled?: boolean;
  children: (ref: { current: HTMLElement | null }) => JSX.Element;
}

const HandleClickOutside = function ({ children, enabled = true, onClickOutside }: HandleClickOutsideInterface) {
  const ref = React.useRef(null);
  useClickAway(ref, () => {
    if (!enabled) return;
    onClickOutside();
  });

  return children(ref);
};

export default React.memo(HandleClickOutside);
