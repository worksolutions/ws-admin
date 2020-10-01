import globalEventBus from "modules/globalEventBus";
import { AppContextStateInterface } from "modules/context/hooks/useAppContext";

import { ActionInputDataInterface } from "../types";

import { RawActionOptions, ActionType } from "types/Actions";

export default async function openModal(
  _appContext: AppContextStateInterface,
  actionOptions: RawActionOptions[ActionType.OPEN_MODAL],
  { inputData }: ActionInputDataInterface,
): Promise<any> {
  const payload = actionOptions.takeIncomeDataFromActionInput ? inputData : actionOptions;
  globalEventBus.emit("OPEN_PAGE_MODAL", payload);
  return Promise.resolve(inputData);
}
