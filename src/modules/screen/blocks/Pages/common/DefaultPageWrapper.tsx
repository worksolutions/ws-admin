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

import { PageModalInterface } from "./types";
import Modals from "./Modals";

function DefaultPageWrapper({
  children,
  heading,
  modals,
}: {
  heading: React.ReactNode;
  children: React.ReactNode;
  modals?: Record<string, PageModalInterface>;
}) {
  return (
    <>
      <Wrapper styles={[padding(24), flex, flexColumn, flexValue(1), fullHeight, overflow("hidden")]}>
        <Wrapper styles={[marginBottom(24), flex, jc(Aligns.SPACE_BETWEEN), ai(Aligns.CENTER), zIndex(3)]}>
          {heading}
        </Wrapper>
        {children}
      </Wrapper>
      <Modals modals={modals} />
    </>
  );
}

export default React.memo(DefaultPageWrapper);
