import React from "react";

import Icon from "primitives/Icon";
import Wrapper from "primitives/Wrapper";

import {
  ai,
  Aligns,
  backgroundColor,
  border,
  borderRadius,
  createAlphaColor,
  flex,
  height,
  jc,
  minHeight,
  minWidth,
  width,
} from "libs/styles";

interface AvatarInterface {
  styles?: any;
  reference?: string;
  size: number;
}

function Avatar({ size, reference, styles }: AvatarInterface) {
  if (reference)
    return (
      <Icon
        icon={reference}
        width={size}
        height={size}
        styles={[minWidth(size), minHeight(size), borderRadius("100%"), styles]}
      />
    );

  return (
    <Wrapper
      styles={[
        minWidth(size),
        minHeight(size),
        width(size),
        height(size),
        borderRadius("100%"),
        border(1, createAlphaColor("black", 20)),
        flex,
        ai(Aligns.CENTER),
        jc(Aligns.CENTER),
        backgroundColor("gray-blue/01"),
        styles,
      ]}
    >
      <Icon icon="user" color="gray-blue/07" />
    </Wrapper>
  );
}

export default React.memo(Avatar);
