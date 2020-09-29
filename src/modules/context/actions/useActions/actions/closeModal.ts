import globalEventBus from "modules/globalEventBus";
import { AppContextStateInterface } from "modules/context/hooks/useAppContext";

import { ActionInputDataInterface } from "../types";

import { RawActionOptions, ActionType } from "types/Actions";

export default async function closeModal(
  _appContext: AppContextStateInterface,
  _actionOptions: RawActionOptions[ActionType.CLOSE_MODAL],
  { inputData }: ActionInputDataInterface,
): Promise<any> {
  globalEventBus.emit("CLOSE_PAGE_MODAL", inputData);
  return Promise.resolve(inputData);
}
