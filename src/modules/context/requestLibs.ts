import { filter } from "ramda";

import { isPureObject } from "libs/is";

export function prepareApiRequestBody(config: { removeEmptyString: boolean }, body: any) {
  if (!isPureObject(body)) return body;
  if (!config.removeEmptyString) return body;
  return filter((fieldValue) => fieldValue !== "", body);
}
