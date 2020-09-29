import useAlwaysEnableTrigger from "./enablers/useAlwaysEnableTrigger";
import useContextTrueValueEnableTrigger from "./enablers/bools/useContextTrueValueEnableTrigger";
import useContextFalseValueEnableTrigger from "./enablers/bools/useContextFalseValueEnableTrigger";

import { ModifierEnableTriggerType, ModifierInterface } from "types/Modifier";

const useEnableTriggerByTriggerType: Record<ModifierEnableTriggerType, (trigger: any) => boolean> = {
  [ModifierEnableTriggerType.ALWAYS]: useAlwaysEnableTrigger,
  [ModifierEnableTriggerType.IF_CONTEXT_TRUE_VALUE]: useContextTrueValueEnableTrigger,
  [ModifierEnableTriggerType.IF_CONTEXT_FALSE_VALUE]: useContextFalseValueEnableTrigger,
};

export function useEnableTrigger(trigger: ModifierInterface["enableTrigger"]) {
  return useEnableTriggerByTriggerType[trigger.type](trigger);
}
