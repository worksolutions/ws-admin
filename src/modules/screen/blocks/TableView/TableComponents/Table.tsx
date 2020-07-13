import React, { ReactNode } from "react";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";

import { flexValue, overflowY } from "libs/styles";

const StyledTable = styled(Wrapper).attrs({ as: "table" })`
  border-spacing: 0;
`;

export default React.memo(function (props: { children: ReactNode } & Record<string, any>) {
  return <StyledTable {...props} css={[flexValue(1), overflowY("scroll")]} />;
});
