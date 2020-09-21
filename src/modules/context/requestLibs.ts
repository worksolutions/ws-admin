import { filter, isNil } from "ramda";

import { isPureObject } from "libs/is";

export function prepareApiRequestBody(
  config: { removeEmptyString: boolean; removeNullableFields: boolean },
  body: any,
) {
  if (!isPureObject(body)) return body;
  let newBody = body;
  if (config.removeEmptyString) newBody = filter((fieldValue) => fieldValue !== "", newBody);
  if (config.removeNullableFields) newBody = filter((fieldValue) => !isNil(fieldValue), newBody);

  return newBody;
}
