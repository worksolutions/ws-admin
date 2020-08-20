export enum ModifierType {
  ELEMENT_DISABLER = "element-disabler",
  CONTEXT_MODIFIER = "context-modifier",
}

export type ModifierOptionsByType = {
  [ModifierType.ELEMENT_DISABLER]: {};
  [ModifierType.CONTEXT_MODIFIER]: { from: string; to: string };
};

export enum ModifierEnableTriggerType {
  ALWAYS = "always",
  CONTEXT_TRUE_VALUE = "context-true-value",
  CONTEXT_FALSE_VALUE = "context-false-value",
}

export interface ModifierInterface {
  type: ModifierType;
  enableTrigger: {
    type: ModifierEnableTriggerType;
    context?: string | string[];
    mode?: "and" | "or";
  };
  options: ModifierOptionsByType[ModifierType.CONTEXT_MODIFIER] | ModifierOptionsByType[ModifierType.ELEMENT_DISABLER];
}
