import { browserHistory } from "common";

import { asyncTimeout } from "libs/asyncTimeout";

import { AppContextStateInterface } from "modules/context/hooks/useAppContext";
import { insertContext } from "modules/context/insertContext";

import { ActionInputDataInterface } from "../types";

import { RawActionOptions, ActionType } from "types/Actions";

export default async function redirect(
  appContext: AppContextStateInterface,
  actionOptions: RawActionOptions[ActionType.REDIRECT],
  { inputData, originalInputData }: ActionInputDataInterface,
): Promise<any> {
  const { reference, useReplace } = actionOptions;
  await asyncTimeout(actionOptions.delay || 0);
  browserHistory[useReplace ? "replace" : "push"](
    insertContext(reference, appContext, {
      inputData,
      originalInputData,
    }).value,
  );
  return Promise.resolve(null);
}
