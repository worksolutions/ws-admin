import React from "react";

export function useScrollCallback(callback: (y: number, x: number) => void, triggerOnElementChange = false) {
  const element = React.useRef<HTMLElement | null>();
  const run = () => {
    if (!element.current) return;
    if (triggerOnElementChange) callback(0, 0);
    element.current.addEventListener("scroll", () => {
      callback(element.current!.scrollTop, element.current!.scrollLeft);
    });
  };

  return (el: HTMLElement | null) => {
    element.current = el;
    run();
  };
}

export function useScrollCallbackWasScrolledBoolean() {
  const [scrolled, setScrolled] = React.useState(false);
  const setScrollableElement = useScrollCallback((y) => {
    if (y === 0) {
      setTimeout(setScrolled, 1, false);
      return;
    }
    if (scrolled) return;
    setTimeout(setScrolled, 1, true);
  });

  return { setScrollableElement, scrolled };
}
