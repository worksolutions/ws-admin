import React from "react";
import { UseMeasureRect } from "react-use/lib/useMeasure";

import Icon, { Icons } from "primitives/Icon";
import Wrapper from "primitives/Wrapper";

import { ai, Aligns, backgroundColor, flex, height, jc, overflow, width } from "libs/styles";
import { useMeasureCallback } from "libs/hooks";

import { StyledComponentsAS } from "types/StyledComponentsAS";

interface ImageInterface {
  src?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
  outerStyles?: any;
  styles?: any;
  as?: StyledComponentsAS;
  emptyIcon?: Icons;
  emptyIconSize?: number;
}

function getSizes(data: Pick<ImageInterface, "width" | "height" | "aspectRatio">, measure: UseMeasureRect) {
  if (data.aspectRatio) {
    if (data.width) return { width: measure.width, height: measure.width / data.aspectRatio };
    return { width: measure.width * data.aspectRatio, height: measure.height };
  }
  return { width: "100%", height: "100%" };
}

function ImageWithDefault({
  src,
  height: heightProp,
  width: widthProp,
  aspectRatio,
  styles,
  outerStyles,
  as,
  emptyIcon = "no-image",
  emptyIconSize,
}: ImageInterface) {
  const imageRef = React.useRef<HTMLElement>();
  const setMeasureRef = useMeasureCallback((size) => {
    if (!imageRef.current) return;
    const resultSizes = getSizes({ height: heightProp, width: widthProp, aspectRatio }, size);
    imageRef.current.style.width = resultSizes.width + "px";
    imageRef.current.style.height = resultSizes.height + "px";
  });

  const image = src ? (
    <Icon icon={src} width="100%" height="100%" />
  ) : (
    <Icon color="gray-blue/03" icon={emptyIcon} width={emptyIconSize} height={emptyIconSize} />
  );

  return (
    <Wrapper
      ref={setMeasureRef}
      styles={[overflow("hidden"), widthProp && width(widthProp), heightProp && height(heightProp), outerStyles]}
    >
      <Wrapper
        ref={imageRef}
        as={as}
        styles={[
          backgroundColor("gray-blue/01"),
          flex,
          ai(Aligns.CENTER),
          jc(Aligns.CENTER),
          overflow("hidden"),
          styles,
        ]}
      >
        {image}
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(ImageWithDefault);
