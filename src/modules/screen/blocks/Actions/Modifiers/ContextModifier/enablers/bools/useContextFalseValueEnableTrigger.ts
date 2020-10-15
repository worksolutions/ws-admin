import { prepareTriggerContextValues } from "./libs";

import { ModifierEnableTriggerIfContextFalseValue, ModifierEnableTriggerMode } from "types/Modifier";

function concatAllTriggerContextValuesByMode(mode: ModifierEnableTriggerMode, stateContextValues: any[]) {
  if (mode === "or") return stateContextValues.some((value) => !Boolean(value));
  return stateContextValues.every((value) => !Boolean(value));
}

export default function (trigger: ModifierEnableTriggerIfContextFalseValue) {
  if (!trigger.contextPath) return false;
  return concatAllTriggerContextValuesByMode(trigger.mode, prepareTriggerContextValues(trigger));
}
