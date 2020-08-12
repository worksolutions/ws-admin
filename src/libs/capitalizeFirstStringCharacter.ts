import { path as ramdaPath } from "ramda";

import { isString } from "./is";

export function capitalizeFirstStringCharacter(str: string) {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}
