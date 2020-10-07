export enum ModifierType {
  UPPER_CASE = "upper-case",
  TRANSLITERATION = "transliteration",
  MODEL_DISABLER = "model-disabler",
  COPY_CONTEXT = "copy-context",
  EXCLUDE_ARRAY_ITEMS_BY_ID_FROM_CONTEXT = "exclude-array-items-by-id-from-context",
}

export type ModifierOptionsByType = {
  [ModifierType.UPPER_CASE]: { contextPath: string };
  [ModifierType.TRANSLITERATION]: { fromContextPath: string; toContextPath: string };
  [ModifierType.MODEL_DISABLER]: { contextPath: string };
  [ModifierType.COPY_CONTEXT]: { fromContextPath: string; toContextPath: string };
  [ModifierType.EXCLUDE_ARRAY_ITEMS_BY_ID_FROM_CONTEXT]: { fromContextPath: string; toContextPath: string };
};

export enum ModifierEnableTriggerType {
  ALWAYS = "always",
  IF_CONTEXT_TRUE_VALUE = "if-context-true-value",
  IF_CONTEXT_FALSE_VALUE = "if-context-false-value",
}

export type ModifierEnableTriggerAlways = {
  type: ModifierEnableTriggerType.ALWAYS;
};

export type ModifierEnableTriggerMode = "and" | "or" | undefined;

export type ModifierEnableTriggerIfContextTrueValue = {
  type: ModifierEnableTriggerType.IF_CONTEXT_TRUE_VALUE;
  contextPath: string | string[];
  mode: ModifierEnableTriggerMode;
};

export type ModifierEnableTriggerIfContextFalseValue = {
  type: ModifierEnableTriggerType.IF_CONTEXT_FALSE_VALUE;
  contextPath: string | string[];
  mode: ModifierEnableTriggerMode;
};

export type ModifierEnableTrigger =
  | ModifierEnableTriggerAlways
  | ModifierEnableTriggerIfContextTrueValue
  | ModifierEnableTriggerIfContextFalseValue;

export type ModifierInterface = {
  enableTrigger: ModifierEnableTrigger;
} & (
  | {
      type: ModifierType.UPPER_CASE;
      options: ModifierOptionsByType[ModifierType.UPPER_CASE];
    }
  | {
      type: ModifierType.TRANSLITERATION;
      options: ModifierOptionsByType[ModifierType.TRANSLITERATION];
    }
  | {
      type: ModifierType.COPY_CONTEXT;
      options: ModifierOptionsByType[ModifierType.COPY_CONTEXT];
    }
  | {
      type: ModifierType.MODEL_DISABLER;
      options: ModifierOptionsByType[ModifierType.MODEL_DISABLER];
    }
  | {
      type: ModifierType.EXCLUDE_ARRAY_ITEMS_BY_ID_FROM_CONTEXT;
      options: ModifierOptionsByType[ModifierType.EXCLUDE_ARRAY_ITEMS_BY_ID_FROM_CONTEXT];
    }
);
