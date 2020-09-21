import React from "react";
import useMeasureDirty from "react-use/esm/useMeasureDirty";

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

export function useScrollToElement(center: boolean, behavior?: ScrollBehavior, position = "relative") {
  const scrollRef = React.useRef<HTMLElement | null>(null);
  const scrollToElementRef = React.useRef<HTMLElement | null>(null);
  const size = useMeasureDirty(scrollRef as any);
  const [run, setRun] = React.useState(false);

  React.useEffect(() => {
    scrollRef.current!.style.position = position;
  }, []);

  React.useEffect(() => {
    if (!run) return;
    if (size.height === 0) return;
    const { offsetTop, offsetHeight } = scrollToElementRef.current!;
    setRun(false);
    if (center) {
      scrollRef.current!.scrollTo({ behavior, top: offsetTop + offsetHeight / 2 - size.height / 2 });
      return;
    }
    scrollRef.current!.scrollTo({ behavior, top: offsetTop });
  }, [size, run]);

  return {
    scrollRef,
    scrollToElementRef,
    run() {
      setRun(true);
    },
  };
}
