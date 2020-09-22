import { isArray } from "libs/is";

import { useStateFromContext } from "modules/context/insertContext";
import { useAppContext } from "modules/context/hooks/useAppContext";

import {
  ModifierEnableTriggerIfContextTrueValue,
  ModifierEnableTriggerMode,
  ModifierEnableTriggerType,
  ModifierInterface,
} from "types/Modifier";

function concatAllTriggerContextValuesByMode(mode: ModifierEnableTriggerMode, stateContextValues: any[]) {
  if (mode === "or") return stateContextValues.some((value) => value === true);
  return stateContextValues.every((value) => value === true);
}

function useTriggerEnabled(trigger: ModifierEnableTriggerIfContextTrueValue) {
  if (!trigger.context) return false;
  const appContext = useAppContext();
  const triggerContextPaths = isArray(trigger.context) ? trigger.context : [trigger.context];
  const triggerContextValues = triggerContextPaths.map((context) => useStateFromContext(context, appContext)[0]);
  return concatAllTriggerContextValuesByMode(trigger.mode, triggerContextValues);
}

const useEnableTriggerByTriggerType: Record<ModifierEnableTriggerType, (trigger: any) => boolean> = {
  [ModifierEnableTriggerType.ALWAYS]: () => true,
  [ModifierEnableTriggerType.IF_CONTEXT_TRUE_VALUE]: useTriggerEnabled,
};

export function useEnableTrigger(trigger: ModifierInterface["enableTrigger"]) {
  return useEnableTriggerByTriggerType[trigger.type](trigger);
}
