import React from "react";
import { differenceWith, eqProps } from "ramda";

import isEqual from "libs/CB/changeDetectionStrategy/performance/isEqual";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useStateFromContext } from "modules/context/insertContext";

import { useEnableTrigger } from "../useEnableTrigger";

import { ModifierInterface, ModifierOptionsByType, ModifierType } from "types/Modifier";

export function useExcludeArrayItemsByIdFromContext(
  trigger: ModifierInterface["enableTrigger"],
  options: ModifierOptionsByType[ModifierType.EXCLUDE_ARRAY_ITEMS_BY_ID_FROM_CONTEXT],
) {
  const appContext = useAppContext();
  const enabled = useEnableTrigger(trigger);

  const [excludeFromValue] = useStateFromContext<{ id: any }[]>(options.fromContextPath, appContext);
  const [currentValue, setCurrentValue] = useStateFromContext<{ id: any }[]>(options.toContextPath, appContext);
  React.useEffect(() => {
    if (!enabled) return;
    const newCurrentValue = differenceWith(eqProps("id"), currentValue, excludeFromValue);
    const isNewAndOldCurrentValueEquals = isEqual(newCurrentValue, currentValue);
    if (isNewAndOldCurrentValueEquals) return;
    setCurrentValue(newCurrentValue);
  }, [enabled, excludeFromValue, currentValue]);
}
