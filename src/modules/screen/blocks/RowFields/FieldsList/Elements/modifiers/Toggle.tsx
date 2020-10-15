import React from "react";
import { observer } from "mobx-react-lite";

import Toggle from "primitives/Toggle";

import { whiteSpace } from "libs/styles";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useStateFromContext } from "modules/context/insertContext";

import { FieldListItemModifierInterface } from "../../types";

function ToggleModifier({ title, contextPath }: FieldListItemModifierInterface) {
  const appContext = useAppContext();
  const [stateValue, setStateValue] = useStateFromContext(contextPath, appContext);
  return (
    <Toggle
      className="modifier"
      textStyles={whiteSpace("nowrap")}
      textOnRight
      text={title}
      enabled={stateValue}
      onChange={setStateValue}
    />
  );
}

export default React.memo(observer(ToggleModifier));
