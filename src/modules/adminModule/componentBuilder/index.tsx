import React, { FC } from "react";
import { AdminComponentInterface } from "../types";
import { compose } from "ramda";
import DataSourceHOC from "../HOC/DataSource/DataSourceHOC";

export function createAdminComponent<P>(
  Cmp: FC<P & AdminComponentInterface>,
  context: any,
) {
  return function (props: P & any) {
    const buildComponent = compose(DataSourceHOC);
    const WrappedCmp = buildComponent(Cmp, context);
    return <WrappedCmp {...props} />;
  };
}
