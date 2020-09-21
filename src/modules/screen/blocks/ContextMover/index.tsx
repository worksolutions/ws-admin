import React from "react";
import { observer } from "mobx-react-lite";
import { assocPath, compose } from "ramda";

import Loading from "components/LoadingContainer/Loading";

import { path, splitByPoint } from "libs/path";

import { useAppContext } from "modules/context/hooks/useAppContext";
import BlockRenderer from "modules/screen/BlockRenderer";

import { BlockInterface } from "state/globalState";

type ContextMoverOptions = {
  block: BlockInterface;
  static: { from: string; to: string }[];
};

function ContextMover({ options }: BlockInterface<ContextMoverOptions>) {
  const appContext = useAppContext();
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    options!.static.forEach(({ from, to }) => {
      const fromPath = splitByPoint(from);
      const toPath = splitByPoint(to);
      const value = path(fromPath, appContext.context);
      const newState = compose(assocPath(fromPath, undefined), assocPath(toPath, value))(appContext.context);
      appContext.updateState(newState as any);
    });
    setInitialized(true);
  }, []);

  if (initialized) return <Loading />;
  return <BlockRenderer {...options!.block} />;
}

export default React.memo(observer(ContextMover));
