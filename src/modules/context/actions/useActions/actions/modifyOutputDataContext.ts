import { AppContextInterface } from "modules/context/hooks/useAppContext";
import { insertContext } from "modules/context/insertContext";

import { ActionType, RawActionOptions } from "types/Actions";

export default async function modifyOutputDataContext(
  appContext: AppContextInterface,
  actionOptions: RawActionOptions[ActionType.MODIFY_OUTPUT_DATA_CONTEXT],
): Promise<any> {
  const { value: outputData } = insertContext(`${actionOptions.resultValue}`, appContext.context);

  return Promise.resolve(outputData);
}
