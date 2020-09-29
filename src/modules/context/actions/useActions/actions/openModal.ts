import globalEventBus from "modules/globalEventBus";
import { AppContextStateInterface } from "modules/context/hooks/useAppContext";

import { ActionInputDataInterface } from "../types";

import { RawActionOptions, ActionType } from "types/Actions";

export default async function openModal(
  _appContext: AppContextStateInterface,
  actionOptions: RawActionOptions[ActionType.OPEN_MODAL],
  { inputData }: ActionInputDataInterface,
): Promise<any> {
  globalEventBus.emit("OPEN_PAGE_MODAL", {
    name: actionOptions.name,
  });
  return Promise.resolve(inputData);
}
