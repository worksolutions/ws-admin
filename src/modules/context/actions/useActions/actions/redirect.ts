import { browserHistory } from "common";
import { assoc } from "ramda";

import { asyncTimeout } from "libs/asyncTimeout";

import { AppContextStateInterface } from "modules/context/hooks/useAppContext";
import { insertContext } from "modules/context/insertContext";

import { ActionInputDataInterface } from "../types";

import { ActionOptions, ActionType } from "types/Actions";

export default async function redirect(
  appContext: AppContextStateInterface,
  actionOptions: ActionOptions[ActionType.REDIRECT],
  { inputData, previousActionOutput }: ActionInputDataInterface,
): Promise<any> {
  const { reference, useReplace } = actionOptions;
  await asyncTimeout(actionOptions.delay || 0);
  browserHistory[useReplace ? "replace" : "push"](
    insertContext(reference, appContext, assoc("previousAction", previousActionOutput, inputData)).value,
  );
  return Promise.resolve(null);
}
