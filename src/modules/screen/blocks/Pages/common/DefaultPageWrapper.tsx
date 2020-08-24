import React from "react";

import Wrapper from "primitives/Wrapper";

import {
  ai,
  Aligns,
  flex,
  flexColumn,
  flexValue,
  fullHeight,
  jc,
  marginBottom,
  overflow,
  padding,
  zIndex,
} from "libs/styles";

function DefaultPageWrapper({ children, heading }: { heading: React.ReactNode; children: React.ReactNode }) {
  return (
    <Wrapper styles={[padding(24), flex, flexColumn, flexValue(1), fullHeight, overflow("hidden")]}>
      <Wrapper styles={[marginBottom(24), flex, jc(Aligns.SPACE_BETWEEN), ai(Aligns.CENTER), zIndex(3)]}>
        {heading}
      </Wrapper>
      {children}
    </Wrapper>
  );
}

export default React.memo(DefaultPageWrapper);
