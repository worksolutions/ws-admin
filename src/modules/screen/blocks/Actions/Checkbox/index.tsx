import React from "react";
import { observer } from "mobx-react-lite";

import Checkbox from "primitives/Checkbox";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useStateFromContext } from "modules/context/insertContext";

import { BlockInterface } from "state/globalState";

function ActionCheckbox({ actions, options }: BlockInterface<{ contextPath?: string; text: string }, "change">) {
  if (!actions?.change) return null;
  if (!options?.contextPath) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);
  const [isChecked] = useStateFromContext(options.contextPath, appContext);

  return <Checkbox isChecked={isChecked} text={options.text} onChange={resultActions.change.run} />;
}

export default React.memo(observer(ActionCheckbox));
