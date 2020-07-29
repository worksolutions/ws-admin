import React from "react";

import Tabs from "primitives/Tabs";
import Wrapper from "primitives/Wrapper";

import { border, borderRadius, padding } from "libs/styles";

import BlockRenderer from "../../BlockRenderer";

import { BlockInterface } from "state/systemState";

function TabsBlock({ options }: BlockInterface<{ title: string; block: BlockInterface }[]>) {
  return (
    <Tabs
      items={options!.map((tab) => ({
        render: () => (
          <Wrapper styles={[border(1, "gray-blue/02"), borderRadius(8), padding("24px 20px")]}>
            <BlockRenderer {...tab.block} />
          </Wrapper>
        ),
        title: tab.title,
      }))}
    />
  );
}

export default React.memo(TabsBlock);
