import { AppContextInterface } from "modules/context/hooks/useAppContext";
import { insertContext } from "modules/context/insertContext";

import { ActionInputDataInterface } from "../types";

import { ActionType, RawActionOptions } from "types/Actions";

export default async function updateContext(
  appContext: AppContextInterface,
  actionOptions: RawActionOptions[ActionType.UPDATE_CONTEXT],
  { inputData: inputDataProp, previousActionOutput }: ActionInputDataInterface,
): Promise<any> {
  const inputData = actionOptions.takeIncomeDataFromPreviousAction ? previousActionOutput : inputDataProp;

  const path = insertContext(actionOptions.context, appContext.context, {
    previousActionOutput,
    inputData: inputDataProp,
  }).value;

  appContext.updateState({ path, data: inputData });

  return Promise.resolve(inputData);
}
