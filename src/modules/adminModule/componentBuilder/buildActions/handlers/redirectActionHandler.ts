import { ActionHandlerOptions, ActionHandlerType } from "../../../types";
import { insertContext } from "../../../context";

export default function (
  options: ActionHandlerOptions[ActionHandlerType.REDIRECT],
  history: any,
  context: any,
): () => Promise<any> {
  return () =>
    new Promise((resolve) => {
      history.push(insertContext(options.url, context));
      resolve();
    });
}
