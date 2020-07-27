import React from "react";

import Wrapper from "primitives/Wrapper";
import Spinner from "primitives/Spinner";

import {
  ai,
  Aligns,
  backgroundColor,
  createAlphaColor,
  flex,
  fullHeight,
  fullWidth,
  jc,
  left,
  position,
  top,
  zIndex,
} from "libs/styles";

export const spinnerElement = (
  <Wrapper
    styles={[
      flex,
      position("absolute"),
      top(0),
      left(0),
      fullWidth,
      fullHeight,
      ai(Aligns.CENTER),
      jc(Aligns.CENTER),
      zIndex(3),
    ]}
  >
    <Wrapper
      styles={[
        position("absolute"),
        top(0),
        left(0),
        fullWidth,
        fullHeight,
        backgroundColor(createAlphaColor("white", 170)),
      ]}
    />
    <Spinner size={40} />
  </Wrapper>
);
