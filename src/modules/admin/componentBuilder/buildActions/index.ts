import { ActionConfInterface, ActionHandlerType, ActionInterface, ActionsInterface } from "../../types";

import redirectActionHandler from "./handlers/redirectActionHandler";
import apiRequestActionHandler from "./handlers/apiRequestActionHandler";

function getActionFuncByType(type: ActionHandlerType | string): (option: any, context: any) => ActionInterface {
  switch (type) {
    case ActionHandlerType.REDIRECT:
      return redirectActionHandler;
    case ActionHandlerType.API_REQUEST:
      return apiRequestActionHandler;
    default:
      console.error(`Указан неизвестный тип действия. [${type}]`);
      return () => () => Promise.resolve(null);
  }
}

export const buildActions = (
  actions: ActionsInterface,
  {
    context,
    updateState,
  }: {
    context: any;
    updateState: (data: { path: string; data: any }) => void;
  },
): {
  [key: string]: ActionInterface;
} | null => {
  if (!actions) return null;

  function actionWrapper(action: ActionInterface, value: ActionConfInterface): ActionInterface {
    return (localContext) => {
      return action(localContext).then(
        (data) => {
          if (value.context) {
            updateState({
              path: value.context,
              data,
            });
          }
          return data;
        },
        (err) => {
          console.error("Ошибка при выполнении действия", err.message);
        },
      );
    };
  }

  return Object.entries(actions).reduce((acc, [actionName, value]) => {
    const actionHandler = getActionFuncByType(value.type)(value.options as any, context);
    acc[actionName] = actionWrapper(actionHandler, value);
    return acc;
  }, {} as { [key: string]: () => Promise<any> });
};
