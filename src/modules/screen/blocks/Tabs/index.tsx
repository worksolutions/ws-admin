import React from "react";
import { useHistory, useLocation } from "react-router";
import qs from "querystring";

import Tabs from "primitives/Tabs";
import Wrapper from "primitives/Wrapper";

import LoadingProvider from "components/LoadingContainer/LoadingProvider";

import { border, borderRadius, flexValue, height, overflowY } from "libs/styles";

import BlockRenderer from "modules/screen/BlockRenderer";

import { BlockInterface } from "state/globalState";

function TabsBlock({ options }: BlockInterface<{ key?: string; tabs: { title: string; block: BlockInterface }[] }>) {
  const history = useHistory();
  const location = useLocation();

  const key = options!.key || "tab";

  function getParsedQuery() {
    return qs.parse(location.search.slice(1));
  }

  const activeIndex = React.useMemo(() => {
    const parsedQuery = getParsedQuery();
    if (!parsedQuery[key]) return 0;
    const value = parseFloat(parsedQuery[key] as string);
    if (isNaN(value)) return 0;
    if (value >= options!.tabs.length) return 0;
    return value;
  }, [location]);

  function setActiveIndex(index: number) {
    const parsedQuery = getParsedQuery();
    history.push({ search: qs.encode({ ...parsedQuery, [key]: index.toString() }) });
  }

  const tabs = React.useMemo(
    () =>
      options!.tabs.map((tab) => ({
        render: () => (
          <LoadingProvider>
            {(loadingProviderRef) => (
              <Wrapper
                ref={loadingProviderRef}
                styles={[border(1, "gray-blue/02"), overflowY("auto"), borderRadius(8), flexValue(1)]}
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

  return <Tabs items={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />;
}

export default React.memo(TabsBlock);
