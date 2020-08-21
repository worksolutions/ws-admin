import { mergeActions, useActions } from "modules/context/actions/useActions";
import { useAppContext } from "modules/context/hooks/useAppContext";

import { ActionType, AnyRawAction } from "types/Actions";

export function useEditActions<ACTIONS extends Record<string, AnyRawAction>>(contextPath: string, actions: ACTIONS) {
  const changeAction: AnyRawAction = {
    type: ActionType.UPDATE_CONTEXT,
    context: contextPath,
    options: {},
  };

  return useActions(mergeActions(actions!, { change: changeAction }), useAppContext());
}
