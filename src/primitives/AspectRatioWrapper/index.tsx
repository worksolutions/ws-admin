import React from "react";
import { UseMeasureRect } from "react-use/lib/useMeasure";

import Wrapper from "primitives/Wrapper";

import { ai, Aligns, flex, height, jc, overflow, stringOrPixels, width } from "libs/styles";
import { useMeasureCallback } from "libs/hooks/useMeasure";

import { StyledComponentsAS } from "types/StyledComponentsAS";

export interface AspectRatioWrapperInterface {
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
  outerStyles?: any;
  styles?: any;
  as?: StyledComponentsAS;
}

function getSizes(
  data: Pick<AspectRatioWrapperInterface, "width" | "height" | "aspectRatio">,
  measure: UseMeasureRect,
) {
  if (data.aspectRatio) {
    if (data.width) return { width: measure.width, height: measure.width / data.aspectRatio };
    return { width: measure.width * data.aspectRatio, height: measure.height };
  }
  return { width: "100%", height: "100%" };
}

function AspectRatioWrapper({
  height: heightProp,
  width: widthProp,
  aspectRatio,
  styles,
  outerStyles,
  as,
  children,
}: AspectRatioWrapperInterface & { children: JSX.Element }) {
  const childContainerRef = React.useRef<HTMLElement>();
  const wrapperRef = useMeasureCallback((size) => {
    if (!childContainerRef.current) return;
    const resultSizes = getSizes({ height: heightProp, width: widthProp, aspectRatio }, size);
    childContainerRef.current.style.width = stringOrPixels(resultSizes.width);
    childContainerRef.current.style.height = stringOrPixels(resultSizes.height);
  });

  return (
    <Wrapper
      ref={wrapperRef}
      styles={[overflow("hidden"), widthProp && width(widthProp), heightProp && height(heightProp), outerStyles]}
    >
      <Wrapper
        ref={childContainerRef}
        as={as}
        styles={[flex, ai(Aligns.CENTER), jc(Aligns.CENTER), overflow("hidden"), styles]}
      >
        {children}
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(AspectRatioWrapper);
