import {
  ActionHandlerType,
  ActionInterface,
  ActionsInterface,
} from "../../types";
import redirectActionHandler from "./handlers/redirectActionHandler";
import apiRequestActionHandler from "./handlers/apiRequestActionHandler";

export const buildActions = (
  actions: ActionsInterface,
  {
    context,
  }: {
    context: any;
    updatePageState: ({ path: string, data: any }) => void;
  },
): {
  [key: string]: ActionInterface;
} => {
  if (!actions) return null;
  return Object.entries(actions).reduce((acc, [actionName, value]) => {
    switch (value.type) {
      case ActionHandlerType.REDIRECT:
        acc[actionName] = redirectActionHandler(value.options as any, context);
        break;
      case ActionHandlerType.API_REQUEST:
        acc[actionName] = apiRequestActionHandler(
          value.options as any,
          context,
        );
        break;
      default:
        console.error(`Указан неизвестный тип действия. [${value.type}]`);
        acc[actionName] = () => Promise.resolve();
    }
    return acc;
  }, {} as { [key: string]: () => Promise<any> });
};