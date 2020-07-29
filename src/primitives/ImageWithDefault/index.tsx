import React from "react";
import { useMeasure } from "react-use";
import { UseMeasureRect } from "react-use/lib/useMeasure";

import { ai, Aligns, backgroundColor, flex, height, jc, overflow, position, width } from "libs/styles";

import Icon, { Icons } from "../Icon";
import Wrapper from "../Wrapper";

import { StyledComponentsAS } from "types/StyledComponentsAS";

interface ImageInterface {
  src?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
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
  as,
  emptyIcon = "no-image",
  emptyIconSize,
}: ImageInterface) {
  const [ref, bounds] = useMeasure();
  const [resultSizes, setResultSizes] = React.useState<{ width: number | string; height: number | string }>(() => ({
    width: 0,
    height: 0,
  }));

  React.useEffect(() => {
    if (bounds.width === 0) return;
    setResultSizes(getSizes({ height: heightProp, width: widthProp, aspectRatio }, bounds));
  }, [bounds]);

  const image = src ? (
    <Icon icon={src} width="100%" height="100%" />
  ) : (
    <Icon color="gray-blue/03" icon={emptyIcon} width={emptyIconSize} height={emptyIconSize} />
  );

  return (
    <Wrapper ref={ref} styles={[overflow("hidden"), widthProp && width(widthProp), heightProp && height(heightProp)]}>
      {resultSizes.width !== 0 && (
        <Wrapper
          as={as}
          styles={[
            backgroundColor("gray-blue/01"),
            flex,
            ai(Aligns.CENTER),
            jc(Aligns.CENTER),
            width(resultSizes.width),
            height(resultSizes.height),
            overflow("hidden"),
            styles,
          ]}
        >
          {image}
        </Wrapper>
      )}
    </Wrapper>
  );
}

export default React.memo(ImageWithDefault);
