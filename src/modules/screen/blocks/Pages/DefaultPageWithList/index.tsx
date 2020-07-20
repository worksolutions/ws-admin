import React from "react";

import Wrapper from "primitives/Wrapper";

import { flex, flexColumn, flexValue, marginBottom, padding } from "libs/styles";

import BlockRenderer from "../../../BlockRenderer";
import { PageComponentInterface } from "../types";

function DefaultPageWithList({ slots }: PageComponentInterface) {
  return (
    <Wrapper styles={[padding(24), flex, flexColumn, flexValue(1)]}>
      {slots.heading && (
        <Wrapper styles={[marginBottom(24)]}>
          <BlockRenderer {...slots.heading} />
        </Wrapper>
      )}
      {slots.mainContent && <BlockRenderer {...slots.mainContent} />}
    </Wrapper>
  );
}

export default React.memo(DefaultPageWithList);
