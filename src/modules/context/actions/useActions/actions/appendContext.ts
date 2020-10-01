import { isArray, isString } from "libs/is";

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

  const { value: targetValue } = insertContext(`=${actionOptions.context}`, appContext.context);

  if (isArray(targetValue)) {
    insertContext(`=${actionOptions.context}`, appContext.context).value.push(inputData);
  }

  if (isString(targetValue)) {
    appContext.updateState({ path: actionOptions.context, data: targetValue + inputData });
  }

  return Promise.resolve(inputData);
}
