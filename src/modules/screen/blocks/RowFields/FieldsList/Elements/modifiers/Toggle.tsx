import React from "react";
import { observer } from "mobx-react-lite";

import Toggle from "primitives/Toggle";

import { marginLeft } from "libs/styles";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useStateFromContext } from "modules/context/insertContext";

import { FieldListItemModifierInterface } from "../../types";

function ToggleModifier({ title, context }: FieldListItemModifierInterface) {
  const appContext = useAppContext();
  const [stateValue, setStateValue] = useStateFromContext(context, appContext);
  return <Toggle styles={marginLeft(16)} textOnRight text={title} enabled={stateValue} onChange={setStateValue} />;
}

export default React.memo(observer(ToggleModifier));