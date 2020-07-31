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
} from "libs/styles";
import { formattedDataViewZIndexes } from "libs/styles/zIndexes";

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
      formattedDataViewZIndexes.spinner,
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
