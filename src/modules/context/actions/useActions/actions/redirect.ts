import { browserHistory } from "common";

import { AppContextStateInterface } from "../../../hooks/useAppContext";
import { ActionInputDataInterface } from "../types";
import { insertContext } from "../../../../admin/context";

import { ActionOptions, ActionType } from "types/Actions";

export default function redirect(
  appContext: AppContextStateInterface,
  actionOptions: ActionOptions[ActionType.REDIRECT],
  inputData: ActionInputDataInterface,
): Promise<any> {
  const { reference, useReplace } = actionOptions;
  console.log(insertContext(reference, { ...appContext, local: inputData }));
  browserHistory[useReplace ? "replace" : "push"](insertContext(reference, { ...appContext, local: inputData }));
  return Promise.resolve(null);
}
