import React from "react";

import Typography from "primitives/Typography";

import { flexValue, marginBottom, overflow } from "libs/styles";

import BlockRenderer from "modules/screen/BlockRenderer";

import DefaultPageWrapper from "../common/DefaultPageWrapper";

import { BlockInterface, ContainSlotsInterface } from "state/globalState";

function DefaultPageWithList({ slots, options }: ContainSlotsInterface & BlockInterface<{ title: string }>) {
  return (
    <DefaultPageWrapper
      heading={
        <>
          <Typography type="h1-bold">{options!.title}</Typography>
          {slots.headingAction && <BlockRenderer {...slots.headingAction} />}
        </>
      }
    >
      {slots.subHeading && <BlockRenderer {...slots.subHeading} styles={[marginBottom(16)]} />}
      {slots.mainContent && <BlockRenderer {...slots.mainContent} styles={[flexValue(1), overflow("hidden")]} />}
    </DefaultPageWrapper>
  );
}

export default React.memo(DefaultPageWithList);
