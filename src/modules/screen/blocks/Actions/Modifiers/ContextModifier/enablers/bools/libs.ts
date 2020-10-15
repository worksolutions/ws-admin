import { isArray } from "libs/is";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useStateFromContext } from "modules/context/insertContext";

import { ModifierEnableTriggerIfContextFalseValue, ModifierEnableTriggerIfContextTrueValue } from "types/Modifier";

export function prepareTriggerContextValues(
  trigger: ModifierEnableTriggerIfContextTrueValue | ModifierEnableTriggerIfContextFalseValue,
) {
  const appContext = useAppContext();
  const triggerContextPaths = isArray(trigger.contextPath) ? trigger.contextPath : [trigger.contextPath];
  return triggerContextPaths.map((contextPath) => useStateFromContext(contextPath, appContext)[0]);
}
