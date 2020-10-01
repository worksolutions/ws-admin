import globalEventBus from "modules/globalEventBus";
import { AppContextStateInterface } from "modules/context/hooks/useAppContext";
import { insertContext } from "modules/context/insertContext";

import { ActionInputDataInterface } from "../types";

import { RawActionOptions, ActionType } from "types/Actions";

export default async function openModal(
  appContext: AppContextStateInterface,
  actionOptions: RawActionOptions[ActionType.NOTIFY],
  { inputData }: ActionInputDataInterface,
): Promise<any> {
  globalEventBus.emit("ADD_TOAST", {
    text: insertContext(actionOptions.text, appContext, inputData).value,
  });
  return Promise.resolve(inputData);
}
