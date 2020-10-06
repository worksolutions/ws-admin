import React from "react";

import { useActions } from "modules/context/actions/useActions";
import { useAppContext } from "modules/context/hooks/useAppContext";
import { mergeActions } from "modules/context/actions/useActions/libs/mergeActions";

import { ActionType, AnyRawAction } from "types/Actions";

export function useEditActions<ACTIONS extends Record<string, AnyRawAction>>(contextPath: string, actions: ACTIONS) {
  const resultActions = React.useMemo(
    () =>
      mergeActions(actions!, {
        change: {
          type: ActionType.UPDATE_CONTEXT,
          options: { context: contextPath },
        },
      }),
    [],
  );

  return useActions(resultActions, useAppContext());
}
