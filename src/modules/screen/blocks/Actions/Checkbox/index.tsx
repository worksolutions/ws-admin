import React from "react";
import { observer } from "mobx-react-lite";

import Checkbox from "primitives/Checkbox";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useStateFromContext } from "modules/context/insertContext";

import { BlockInterface } from "state/globalState";

function ActionCheckbox({ actions, options }: BlockInterface<{ context?: string; text: string }, "change">) {
  if (!actions?.change) return null;
  if (!options) return null;
  if (!options?.context) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);
  const [isChecked] = useStateFromContext(options.context, appContext);

  return <Checkbox isChecked={isChecked} text={options.text} onChange={resultActions.change.run} />;
}

export default React.memo(observer(ActionCheckbox));
