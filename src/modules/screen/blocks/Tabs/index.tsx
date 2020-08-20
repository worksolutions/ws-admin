import React from "react";

import Tabs from "primitives/Tabs";
import Wrapper from "primitives/Wrapper";

import LoadingProvider from "components/LoadingContainer/LoadingProvider";

import { border, borderRadius, flexValue, overflowY } from "libs/styles";

import BlockRenderer from "modules/screen/BlockRenderer";

import { BlockInterface } from "state/globalState";

function TabsBlock({ options }: BlockInterface<{ title: string; block: BlockInterface }[]>) {
  const tabs = React.useMemo(
    () =>
      options!.map((tab) => ({
        render: () => (
          <LoadingProvider>
            {(loadingProviderRef) => (
              <Wrapper
                ref={loadingProviderRef}
                styles={[border(1, "gray-blue/02"), borderRadius(8), flexValue(1), overflowY("auto")]}
              >
                <BlockRenderer {...tab.block} />
              </Wrapper>
            )}
          </LoadingProvider>
        ),
        title: tab.title,
      })),
    [],
  );

  return <Tabs items={tabs} />;
}

export default React.memo(TabsBlock);
