import React from "react";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useStateFromContext } from "modules/context/insertContext";

import { ModifierInterface, ModifierOptionsByType, ModifierType } from "types/Modifier";

export function useUpperCaseContextModifier(
  trigger: ModifierInterface["enableTrigger"],
  options: ModifierOptionsByType[ModifierType.UPPER_CASE],
) {
  const appContext = useAppContext();
  const [value, setValue] = useStateFromContext(options.contextPath, appContext);
  React.useEffect(() => {
    setValue(value.toUpperCase());
  }, [value]);
}
