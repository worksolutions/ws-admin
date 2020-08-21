import { useBoolean, useEffectSkipFirst } from "libs/hooks/common";

import { dataAndInitialDataAreEquals } from "modules/context/dataSource/useDataSource";

export function useFormTouched(data: any, initialData: any) {
  const [touched, enableTouched, disableTouched] = useBoolean(false);
  const dataAreEquals = dataAndInitialDataAreEquals(data, initialData);

  useEffectSkipFirst(() => {
    if (dataAreEquals) {
      disableTouched();
      return;
    }
    enableTouched();
  }, [dataAreEquals]);

  return touched;
}
