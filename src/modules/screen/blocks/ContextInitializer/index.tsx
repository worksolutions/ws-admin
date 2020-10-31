import React from "react";
import { observer } from "mobx-react-lite";

import Loading from "components/LoadingContainer/Loading";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useDataSource } from "modules/context/dataSource/useDataSource";
import BlockRenderer from "modules/screen/BlockRenderer";

import { useActions } from "../../../context/actions/useActions";

import { BlockInterface } from "state/globalState";

import { AnyRawAction, ContainsRawActions } from "types/Actions";

type ContextInitializerOptions = {
  block?: BlockInterface;
  static?: { path: string; value: any }[];
} & Partial<ContainsRawActions<Record<string, AnyRawAction>>>;

function ContextInitializer({ options, dataSource, ...props }: BlockInterface<ContextInitializerOptions>) {
  if (!options) return null;

  const appContext = useAppContext();
  const [staticDataInitialized, setStaticDataInitialized] = React.useState(false);
  const [apiDataInitialized, setApiDataInitialized] = React.useState(false);
  const data = dataSource ? useDataSource(dataSource) : null;
  const actions = options.actions ? useActions(options.actions, appContext) : null;

  React.useEffect(() => {
    options.static?.forEach(({ value, path }) => {
      appContext.updateState({ path, data: value });
    });
    setStaticDataInitialized(true);

    if (!actions) {
      setApiDataInitialized(true);
      return;
    }
    Promise.all(Object.values(actions).map((action) => action.run())).finally(() => setApiDataInitialized(true));
  }, []);

  if (!staticDataInitialized) return <Loading />;
  if (data && data.loadingContainer.loading) return <Loading />;
  if (!apiDataInitialized) return <Loading />;

  return options.block ? <BlockRenderer {...props} {...options.block} /> : null;
}

export default React.memo(observer(ContextInitializer));
