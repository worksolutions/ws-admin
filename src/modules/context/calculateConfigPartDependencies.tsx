import { compose, filter, map, uniq } from "ramda";

const getContextParams = compose(
  uniq,
  map((el: any) => el[1]),
  filter((el: any) => !!el[1]),
  filter(Boolean) as (data: any) => any[],
  Array.from as (data: any) => any[],
  compose((json) => json.matchAll(/{{(.+?)}}/gm), JSON.stringify as (data: any) => string),
);

export default function (config: any): string[] {
  return getContextParams(config) || [];
}
