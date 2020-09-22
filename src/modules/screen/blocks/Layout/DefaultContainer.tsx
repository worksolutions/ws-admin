import React from "react";

import BlockRenderer from "../../BlockRenderer";

import DefaultContainerWrapper from "./DefaultContainerWrapper";

import { ContainSlotsInterface } from "state/globalState";

function DefaultContainer({ slots }: ContainSlotsInterface) {
  return (
    <DefaultContainerWrapper
      header={slots.headerContent ? <BlockRenderer {...slots.headerContent} /> : undefined}
      headerAction={slots.headerAction ? <BlockRenderer {...slots.headerAction} /> : undefined}
      main={<BlockRenderer {...slots.mainContent} />}
    />
  );
}

export default React.memo(DefaultContainer);
