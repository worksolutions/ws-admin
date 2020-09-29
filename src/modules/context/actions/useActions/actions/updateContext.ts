import { AppContextInterface } from "modules/context/hooks/useAppContext";

import { ActionInputDataInterface } from "../types";

import { ActionType, RawActionOptions } from "types/Actions";

export default async function updateContext(
  appContext: AppContextInterface,
  actionOptions: RawActionOptions[ActionType.UPDATE_CONTEXT],
  { inputData: inputDataProp, previousActionOutput }: ActionInputDataInterface,
): Promise<any> {
  const inputData = actionOptions.takeIncomeDataFromPreviousAction ? previousActionOutput : inputDataProp;
  appContext.updateState({ path: actionOptions.context, data: inputData });
  return Promise.resolve(inputData);
}
