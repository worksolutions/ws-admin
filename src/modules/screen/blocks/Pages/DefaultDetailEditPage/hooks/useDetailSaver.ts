import React from "react";
import { inc } from "ramda";

import { BaseError } from "libs/BaseError";
import { entriesObjectMap } from "libs/entriesObjectMap";
import { useBoolean } from "libs/hooks/common";
import { asyncTimeout } from "libs/asyncTimeout";
import { useTimer } from "libs/hooks/useTimer";

import { insertContext } from "modules/context/insertContext";
import { ActionInterface } from "modules/context/actions/useActions";
import { AppContextStateInterface, useAppContext } from "modules/context/hooks/useAppContext";
import { makeModelContextPath } from "modules/model";
import globalEventBus from "modules/globalEventBus";

function getFieldsErrors(errors: Record<string, string>, context: AppContextStateInterface) {
  return entriesObjectMap(errors, ([key, error]) => [
    makeModelContextPath(key),
    {
      disabled: insertContext("=" + makeModelContextPath(key), context).value,
      error,
    },
  ]);
}

export function useDetailSaver(
  { save, change, close }: Record<"save" | "change" | "close", ActionInterface>,
  updateInitial: () => void,
) {
  const appContext = useAppContext();
  const [saveLoading, enableSaveLoading, disableSaveLoading] = useBoolean(false);
  const [applyLoading, enableApplyLoading, disableApplyLoading] = useBoolean(false);
  const [saveCompleteShowed, setSaveCompleteShowed] = React.useState(false);
  const [saveCompleteOpened, openSaveComplete, closeSaveComplete] = useBoolean(false);

  const timer = useTimer({
    interval: 4000,
    finisher: (value) => value === 1,
    handler: inc,
    initialValue: () => 0,
    onSuccess: closeSaveComplete,
  });

  const sendErrorsToAction = (error: BaseError) => change.run(getFieldsErrors(error.getErrors(), appContext.context));

  const sendErrorToast = (error: BaseError) =>
    globalEventBus.emit("ADD_TOAST", { text: error.getMessage(), error: true });

  async function runSaving() {
    try {
      await save.run();
      updateInitial();
      setSaveCompleteShowed(true);
      timer.start();
      openSaveComplete();
    } catch (error) {
      await asyncTimeout(500);
      if (!BaseError.isBaseError(error)) throw error;
      error.hasErrors() ? await sendErrorsToAction(error) : sendErrorToast(error);
      throw error;
    }
  }

  const saveHandler = React.useCallback(() => {
    enableSaveLoading();
    runSaving().then(close.run).finally(disableSaveLoading);
  }, []);

  const applyHandler = React.useCallback(() => {
    enableApplyLoading();
    runSaving().finally(disableApplyLoading);
  }, [applyLoading]);

  return { saveCompleteShowed, saveCompleteOpened, saveLoading, applyLoading, save: saveHandler, apply: applyHandler };
}
