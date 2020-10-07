import React from "react";
import { transliterate } from "transliteration";

import { isString } from "libs/is";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useStateFromContext } from "modules/context/insertContext";

import { useEnableTrigger } from "../useEnableTrigger";

import { ModifierInterface, ModifierOptionsByType, ModifierType } from "types/Modifier";

export function useTransliterationContextModifier(
  trigger: ModifierInterface["enableTrigger"],
  options: ModifierOptionsByType[ModifierType.TRANSLITERATION],
) {
  const appContext = useAppContext();
  const enabled = useEnableTrigger(trigger);

  const [currentValue] = useStateFromContext(options.fromContextPath, appContext);
  const [, setNewValue] = useStateFromContext(options.toContextPath, appContext);
  React.useEffect(() => {
    if (!enabled) return;
    if (!isString(currentValue)) return;
    setNewValue(transliterate(currentValue));
  }, [enabled, currentValue]);
}
