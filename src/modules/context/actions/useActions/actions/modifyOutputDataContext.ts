import { AppContextInterface } from "modules/context/hooks/useAppContext";
import { insertContext } from "modules/context/insertContext";

import { ActionInputDataInterface } from "../types";

import { ActionType, RawActionOptions } from "types/Actions";

export default async function modifyOutputDataContext(
  appContext: AppContextInterface,
  actionOptions: RawActionOptions[ActionType.MODIFY_OUTPUT_DATA_CONTEXT],
  { inputData, originalInputData }: ActionInputDataInterface,
): Promise<any> {
  const { value: outputData } = insertContext(actionOptions.resultOutput, appContext.context, {
    inputData,
    originalInputData,
  });
  return Promise.resolve(outputData);
}
