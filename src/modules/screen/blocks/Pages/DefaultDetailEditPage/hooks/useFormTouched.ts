import { useBoolean, useEffectSkipFirst } from "libs/hooks/common";

import { dataSourceValueWasChanged } from "modules/context/dataSource/useDataSource";

export function useFormTouched(data: any, initialData: any) {
  const [touched, enableTouched, disableTouched] = useBoolean(false);
  const dataAreNotEquals = dataSourceValueWasChanged(data, initialData);

  useEffectSkipFirst(() => {
    if (dataAreNotEquals) {
      enableTouched();
      return;
    }
    disableTouched();
  }, [dataAreNotEquals]);

  return touched;
}
