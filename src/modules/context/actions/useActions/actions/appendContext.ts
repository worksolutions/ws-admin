import { AppContextInterface } from "modules/context/hooks/useAppContext";
import { insertContext } from "modules/context/insertContext";

import { ActionInputDataInterface } from "../types";

import { ActionType, RawActionOptions } from "types/Actions";

export default async function appendContext(
  appContext: AppContextInterface,
  actionOptions: RawActionOptions[ActionType.APPEND_CONTEXT],
  { inputData: inputDataProp, previousActionOutput }: ActionInputDataInterface,
): Promise<any> {
  const inputData = actionOptions.takeIncomeDataFromPreviousAction ? previousActionOutput : inputDataProp;
  insertContext(`=${actionOptions.context}`, appContext.context).value.push(inputData);
  return Promise.resolve(inputData);
}
