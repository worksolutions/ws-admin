import React, { ReactNode } from "react";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";

import { border, borderRadius, flexValue, overflowY } from "libs/styles";

const StyledTable = styled(Wrapper).attrs({ as: "table" })`
  border-spacing: 0;
`;

export default React.memo(function (props: { children: ReactNode } & Record<string, any>) {
  return (
    <StyledTable {...props} css={[flexValue(1), borderRadius(8), overflowY("scroll"), border(1, "gray-blue/02")]} />
  );
});
