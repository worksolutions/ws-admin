import React from "react";
import { useClickAway } from "react-use";

export interface HandleClickOutsideInterface {
  onClickOutside: () => void;
  enabled?: boolean;
  ignoreElements?: (HTMLElement | undefined | null)[];
  children: (ref: { current: HTMLElement | null }) => JSX.Element;
}

const emptyFunc = () => null;
const HandleClickOutside = function ({
  children,
  ignoreElements,
  enabled = true,
  onClickOutside,
}: HandleClickOutsideInterface) {
  const ref = React.useRef<HTMLElement>(null);
  const handler = (event: Event) => {
    if (ignoreElements?.filter(Boolean).find((ignorableElement) => ignorableElement!.contains(event.target as any)))
      return;
    onClickOutside();
  };

  useClickAway(ref, enabled ? handler : emptyFunc);

  return children(ref);
};

export default React.memo(HandleClickOutside);
