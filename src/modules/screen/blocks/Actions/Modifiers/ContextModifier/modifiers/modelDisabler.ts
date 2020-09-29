import React from "react";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useStateContextModel } from "modules/model";

import { useEnableTrigger } from "../useEnableTrigger";

import { ModifierInterface, ModifierOptionsByType, ModifierType } from "types/Modifier";

export function useModelDisablerContextModifier(
  trigger: ModifierInterface["enableTrigger"],
  options: ModifierOptionsByType[ModifierType.MODEL_DISABLER],
) {
  const enabled = useEnableTrigger(trigger);

  const appContext = useAppContext();
  const { model, setModel } = useStateContextModel(options.context, appContext);

  React.useEffect(() => {
    setModel({ disabled: enabled, error: model.error });
  }, [enabled]);
}
