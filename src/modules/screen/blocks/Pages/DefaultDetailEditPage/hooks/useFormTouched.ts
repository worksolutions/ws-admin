import { useBoolean, useEffectSkipFirst } from "libs/hooks/common";
import isEqual from "libs/CB/changeDetectionStrategy/performance/isEqual";

import { modelContextPathPostfix } from "modules/model";

export function omitFormModels(data: Record<string, any>) {
  return Object.fromEntries(Object.entries(data).filter(([key]) => !key.includes(modelContextPathPostfix)));
}

export function useFormTouched(data: any, initialData: any) {
  const [touched, enableTouched, disableTouched] = useBoolean(false);
  const dataAreEquals = isEqual(omitFormModels(data), omitFormModels(initialData));

  useEffectSkipFirst(() => {
    if (dataAreEquals) {
      disableTouched();
      return;
    }
    enableTouched();
  }, [dataAreEquals]);

  return touched;
}
