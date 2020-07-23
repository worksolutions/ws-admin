import React from "react";

import Wrapper from "primitives/Wrapper";

import { flex, flexColumn, flexValue, fullHeight, marginBottom, overflow, padding } from "libs/styles";

import BlockRenderer from "modules/screen/BlockRenderer";

import { PageComponentInterface } from "../types";

function DefaultPageWithList({ slots }: PageComponentInterface) {
  return (
    <Wrapper styles={[padding(24), flex, flexColumn, flexValue(1), fullHeight, overflow("hidden")]}>
      {slots.heading && (
        <Wrapper styles={[marginBottom(24)]}>
          <BlockRenderer {...slots.heading} />
        </Wrapper>
      )}
      {slots.mainContent && <BlockRenderer {...slots.mainContent} styles={[flexValue(1), overflow("hidden")]} />}
    </Wrapper>
  );
}

export default React.memo(DefaultPageWithList);
