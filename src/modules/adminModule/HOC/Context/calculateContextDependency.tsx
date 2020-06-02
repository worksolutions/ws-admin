import React, { FC } from "react";
import { compose, filter, map, uniq } from "ramda";

const getContextParams = compose(
  uniq,
  // @ts-ignore
  map((el) => el[1]),
  filter((el: [string, string]) => !!el[1]),
  filter(Boolean),
  Array.from,
  (json: any) => json.matchAll(/{{(.+?)}}/gm),
  // @ts-ignore
  JSON.stringify,
);

export default function <P extends { config: any }>(Cmp: FC<P>) {
  return function (props: P) {
    // @ts-ignore
    let contextParams = getContextParams(props.config);
    if (!contextParams) {
      contextParams = [];
    }

    return <Cmp {...(props as P)} contextDependsParam={contextParams} />;
  };
}
