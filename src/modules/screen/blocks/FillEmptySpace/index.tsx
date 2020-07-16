import React from "react";

import Wrapper from "primitives/Wrapper";

import { flexValue } from "libs/styles";

function FillEmptySpace() {
  return <Wrapper styles={[flexValue(1)]} />;
}

export default React.memo(FillEmptySpace);
