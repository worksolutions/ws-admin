import React from "react";

import Wrapper from "primitives/Wrapper";

import { Aligns, child, flex, flexColumn, jc, margin, marginBottom } from "libs/styles";

export default function () {
  return <Wrapper styles={[flex, child([flex, flexColumn, jc(Aligns.CENTER), margin(10), child(marginBottom(10))])]} />;
}
