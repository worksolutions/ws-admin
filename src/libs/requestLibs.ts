import { filter } from "ramda";

import { isObject } from "./is";

export function prepareApiRequestBody(config: { removeEmptyString: boolean }, body: any) {
  if (!isObject(body)) return body;
  if (!config.removeEmptyString) return body;
  return filter((fieldValue) => fieldValue !== "", body);
}
