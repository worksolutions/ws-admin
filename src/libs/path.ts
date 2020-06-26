import { path as ramdaPath } from "ramda";

import { isString } from "./is";

export function path(fullPath: string | string[], obj: any): any {
  if (isString(fullPath)) return ramdaPath(fullPath.split("."), obj);
  return ramdaPath(fullPath, obj);
}
