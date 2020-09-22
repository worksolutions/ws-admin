import React from "react";
import { observer } from "mobx-react-lite";

import { useUpperCaseContextModifier } from "./modifiers/upperCase";
import { useTransliterationContextModifier } from "./modifiers/transliteration";
import { useCopyContextModifier } from "./modifiers/copyContext";
import { useModelDisablerContextModifier } from "./modifiers/modelDisabler";

import { BlockInterface } from "state/globalState";

import { ModifierInterface, ModifierType } from "types/Modifier";

const matchHookAndType: Record<ModifierType, (trigger: ModifierInterface["enableTrigger"], options: any) => void> = {
  [ModifierType.UPPER_CASE]: useUpperCaseContextModifier,
  [ModifierType.TRANSLITERATION]: useTransliterationContextModifier,
  [ModifierType.COPY_CONTEXT]: useCopyContextModifier,
  [ModifierType.MODEL_DISABLER]: useModelDisablerContextModifier,
};

function ContextModifier({ options }: BlockInterface<ModifierInterface>) {
  if (!options) return null;
  matchHookAndType[options.type](options.enableTrigger, options.options);
  return null;
}

export default React.memo(observer(ContextModifier));
