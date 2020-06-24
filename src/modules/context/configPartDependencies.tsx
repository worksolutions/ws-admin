import React from "react";
import { compose, filter, map, uniq } from "ramda";

import { getContextTypeAndPathByParam } from "./contextParamParser";

const getContextParams = compose(
  uniq,
  map((el: any) => el[1]),
  filter((el: any) => !!el[1]),
  filter(Boolean) as (data: any) => any[],
  Array.from as (data: any) => any[],
  compose((json) => json.matchAll(/{{(.+?)}}/gm), JSON.stringify as (data: any) => string),
);

export function getConfigPartDependencies(config: any) {
  return (getContextParams(config) || []).map(getContextTypeAndPathByParam);
}
