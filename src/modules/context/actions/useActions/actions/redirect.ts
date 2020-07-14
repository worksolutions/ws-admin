import { browserHistory } from "common";

import { AppContextStateInterface } from "modules/context/hooks/useAppContext";
import { insertContext } from "modules/context/insertContext";

import { ActionInputDataInterface } from "../types";

import { ActionOptions, ActionType } from "types/Actions";

export default function redirect(
  appContext: AppContextStateInterface,
  actionOptions: ActionOptions[ActionType.REDIRECT],
  inputData: ActionInputDataInterface,
): Promise<any> {
  const { reference, useReplace } = actionOptions;
  browserHistory[useReplace ? "replace" : "push"](insertContext(reference, { ...appContext, local: inputData }));
  return Promise.resolve(null);
}
