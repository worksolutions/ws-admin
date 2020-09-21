import { AnyRawAction } from "types/Actions";

export function mergeActions<F extends Record<string, AnyRawAction>, S extends Record<string, AnyRawAction>>(
  firstActions: F,
  secondsActions: S,
) {
  return { ...firstActions, ...secondsActions };
}
