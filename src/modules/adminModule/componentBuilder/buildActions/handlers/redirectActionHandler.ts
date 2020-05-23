import {
  ActionHandlerOptions,
  ActionHandlerType,
  ActionInterface,
} from "../../../types";
import { insertContext } from "../../../context";

export default function (
  options: ActionHandlerOptions[ActionHandlerType.REDIRECT],
  context: any,
): ActionInterface {
  return (localContext) =>
    new Promise((resolve) => {
      window.location.assign(
        insertContext(options.url, { ...context, ...localContext }),
      );
      resolve();
    });
}
