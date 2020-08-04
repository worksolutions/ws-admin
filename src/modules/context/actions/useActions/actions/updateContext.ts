import { AppContextStateInterface } from "modules/context/hooks/useAppContext";

import { ActionInputDataInterface } from "../types";

import { ActionOptions, ActionType } from "types/Actions";

export default async function updateContext(
  _appContext: AppContextStateInterface,
  _actionOptions: ActionOptions[ActionType.UPDATE_CONTEXT],
  inputData: ActionInputDataInterface,
): Promise<any> {
  return Promise.resolve(inputData);
}
