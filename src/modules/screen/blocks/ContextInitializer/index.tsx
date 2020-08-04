import React from "react";
import { observer } from "mobx-react-lite";

import { useAppContext } from "modules/context/hooks/useAppContext";

import { BlockInterface } from "state/globalState";

function ContextInitializer({ options }: BlockInterface<{ path: string; value: any }[]>) {
  if (!options) return null;
  const appContext = useAppContext();

  React.useEffect(() => {
    options.forEach(({ value, path }) => {
      appContext.updateState({ path, data: value });
    });
  }, []);

  return null;
}

export default React.memo(observer(ContextInitializer));
