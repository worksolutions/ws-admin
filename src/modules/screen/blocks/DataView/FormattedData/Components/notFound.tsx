import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import { ai, Aligns, flex, flexValue, fullHeight, jc } from "libs/styles";

export const notFoundElement = (
  <Wrapper styles={[flex, flexValue(1), fullHeight, ai(Aligns.CENTER), jc(Aligns.CENTER)]}>
    <Typography color="gray-blue/05">По вашему запросу ничего не найдено</Typography>
  </Wrapper>
);
