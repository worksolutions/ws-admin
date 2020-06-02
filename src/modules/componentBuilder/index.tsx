import React, { FC } from "react";
import { compose } from "ramda";

import { AdminComponentInterface } from "../types";
import DataSourceHOC from "../HOC/DataSource/DataSourceHOC";

export function createAdminComponent<P>(Cmp: FC<P & AdminComponentInterface>, context: any) {
  return function (props: P & any) {
    const WrappedCmp = compose(DataSourceHOC)(Cmp, context);
    return <WrappedCmp {...props} />;
  };
}
