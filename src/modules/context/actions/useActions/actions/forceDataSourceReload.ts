import { AppContextInterface } from "modules/context/hooks/useAppContext";
import globalEventBus from "modules/globalEventBus";

import { ActionType, RawActionOptions } from "types/Actions";

export default async function forceDataSourceReload(
  appContext: AppContextInterface,
  actionOptions: RawActionOptions[ActionType.FORCE_DATA_SOURCE_RELOAD],
): Promise<any> {
  globalEventBus.emit("FORCE_DATA_SOURCE_RELOAD", actionOptions.id);
  return Promise.resolve(null);
}
