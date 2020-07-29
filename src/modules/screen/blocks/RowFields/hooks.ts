import React from "react";

export function useForceWidthStyles(onCalculated?: (maxWidth: number) => void) {
  const widthRefs = React.useRef<number[]>([]);
  const [forceWidth, setForceWidth] = React.useState(0);

  React.useEffect(() => {
    const max = Math.max(...widthRefs.current);
    setForceWidth(max);
    if (onCalculated) onCalculated(max);
  }, []);

  return { forceWidth, widthRefs };
}
