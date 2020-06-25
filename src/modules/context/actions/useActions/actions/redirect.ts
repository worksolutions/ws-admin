import { browserHistory } from "common";

import { ActionOptions, ActionType } from "types/Actions";

export default function redirect({ reference }: ActionOptions[ActionType.REDIRECT]): Promise<any> {
  browserHistory.replace(reference);
  return Promise.resolve(null);
}
