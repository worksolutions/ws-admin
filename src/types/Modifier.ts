export enum ModifierType {
  UPPER_CASE = "upper-case",
  TRANSLITERATION = "transliteration",
  MODEL_DISABLER = "model-disabler",
  COPY_CONTEXT = "copy-context",
  EXCLUDE_ARRAY_ITEMS_BY_ID_FROM_CONTEXT = "exclude-array-items-by-id-from-context",
}

export type ModifierOptionsByType = {
  [ModifierType.UPPER_CASE]: { context: string };
  [ModifierType.TRANSLITERATION]: { fromContext: string; toContext: string };
  [ModifierType.MODEL_DISABLER]: { context: string };
  [ModifierType.COPY_CONTEXT]: { fromContext: string; toContext: string };
  [ModifierType.EXCLUDE_ARRAY_ITEMS_BY_ID_FROM_CONTEXT]: { fromContext: string; toContext: string };
};

export enum ModifierEnableTriggerType {
  ALWAYS = "always",
  IF_CONTEXT_TRUE_VALUE = "if-context-true-value",
}

export type ModifierEnableTriggerAlways = {
  type: ModifierEnableTriggerType.ALWAYS;
};

export type ModifierEnableTriggerMode = "and" | "or" | undefined;

export type ModifierEnableTriggerIfContextTrueValue = {
  type: ModifierEnableTriggerType.IF_CONTEXT_TRUE_VALUE;
  context: string | string[];
  mode: ModifierEnableTriggerMode;
};

export type ModifierEnableTrigger = ModifierEnableTriggerAlways | ModifierEnableTriggerIfContextTrueValue;

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
