import React, { ReactNode, Ref } from "react";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";

import { flex, flexColumn, flexValue } from "libs/styles";

const StyledTable = styled(Wrapper).attrs({ as: "table" })`
  border-spacing: 0;
`;

export default React.memo(
  React.forwardRef(function (props: { children: ReactNode } & Record<string, any>, ref: Ref<HTMLElement>) {
    return <StyledTable {...props} ref={ref} css={[flexValue(1), flex, flexColumn]} />;
  }),
);
