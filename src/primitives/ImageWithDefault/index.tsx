import React from "react";

import Icon, { Icons } from "primitives/Icon";

import { backgroundColor } from "libs/styles";

import AspectRatioWrapper, { AspectRatioWrapperInterface } from "../AspectRatioWrapper";

interface ImageInterface extends AspectRatioWrapperInterface {
  src?: string;
  emptyIcon?: Icons;
  emptyIconSize?: number;
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
  const image = src ? (
    <Icon icon={src} width="100%" height="100%" />
  ) : (
    <Icon color="gray-blue/03" icon={emptyIcon} width={emptyIconSize} height={emptyIconSize} />
  );

  return (
    <AspectRatioWrapper
      aspectRatio={aspectRatio}
      as={as}
      height={heightProp}
      width={widthProp}
      outerStyles={outerStyles}
      styles={[backgroundColor("gray-blue/01"), styles]}
    >
      {image}
    </AspectRatioWrapper>
  );
}

export default React.memo(ImageWithDefault);
