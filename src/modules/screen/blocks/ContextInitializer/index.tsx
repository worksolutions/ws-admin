import React from "react";
import { observer } from "mobx-react-lite";

import Loading from "components/LoadingContainer/Loading";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useDataSource } from "modules/context/dataSource/useDataSource";
import BlockRenderer from "modules/screen/BlockRenderer";

import { BlockInterface } from "state/globalState";

type ContextInitializerOptions = {
  block: BlockInterface;
  static?: { path: string; value: any }[];
};

function ContextInitializer({ options, dataSource }: BlockInterface<ContextInitializerOptions>) {
  const appContext = useAppContext();
  const [staticDataInitialized, setStaticDataInitialized] = React.useState(false);
  const data = dataSource ? useDataSource(dataSource) : null;

  React.useEffect(() => {
    options!.static?.forEach(({ value, path }) => {
      appContext.updateState({ path, data: value });
    });
    setStaticDataInitialized(true);
  }, []);

  if (!staticDataInitialized) return <Loading />;
  if (data && data.loadingContainer.loading) return <Loading />;

  return <BlockRenderer {...options!.block} />;
}

export default React.memo(observer(ContextInitializer));
