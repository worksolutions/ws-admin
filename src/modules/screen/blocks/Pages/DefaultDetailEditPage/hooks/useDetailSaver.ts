import { BaseError } from "libs/BaseError";
import { entriesObjectMap } from "libs/entriesObjectMap";

import { insertContext } from "modules/context/insertContext";
import { ActionInterface } from "modules/context/actions/useActions";
import { useAppContext } from "modules/context/hooks/useAppContext";
import { ContextModelInterface, createModelContextPath } from "modules/model";

export function useDetailSaver(
  { save, change }: Record<"save" | "change", ActionInterface>,
  updateInitial: () => void,
) {
  const appContext = useAppContext();
  return async function () {
    try {
      await save.run();
    } catch (error) {
      if (!(error instanceof BaseError)) return;
      const mappedErrors = entriesObjectMap(error.getErrors(), ([key, error]) => [
        createModelContextPath(key),
        {
          disabled: insertContext("=" + createModelContextPath(key), appContext.context).value,
          error,
        } as ContextModelInterface,
      ]);
      await change.run(mappedErrors);
    }
    updateInitial();
  };
}
