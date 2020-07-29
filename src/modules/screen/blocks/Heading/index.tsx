import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import { ai, Aligns, flex, flexValue, jc } from "libs/styles";

import BlockRenderer from "modules/screen/BlockRenderer";

import { BlockInterface } from "state/systemState";

function Heading({ options }: BlockInterface<{ value: string; actionBlockElements: BlockInterface[] }>) {
  return (
    <Wrapper styles={[flex, jc(Aligns.SPACE_BETWEEN), ai(Aligns.CENTER), flexValue(1)]}>
      <Typography type="h1-bold">{options!.value}</Typography>
      {options?.actionBlockElements?.map((item, key) => (
        <BlockRenderer key={key} {...item} />
      ))}
    </Wrapper>
  );
}

export default React.memo(observer(Heading));
