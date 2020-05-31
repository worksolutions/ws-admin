import React, { FC, useCallback, useEffect, useState } from "react";
import { assocPath, path, pipe } from "ramda";
import { pureConnect } from "light-state-manager";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import withPerformance from "libs/performance/withPerformance";

import {
  DataSourceInterface,
  useDataSource,
} from "../../HOC/DataSource/DataSourceHOC";
import { ActionsInterface, AdminComponentInterface } from "../../types";
import { buildActions } from "../../componentBuilder/buildActions";
import calculateContextDependency from "../../HOC/Context/calculateContextDependency";

import pageState from "state/page/state";

export const loadComponent = (type: string, cb: (cmp) => void) => {
  import(`commonComponents/${type}`).then(
    (module) => cb(module.default),
    console.error,
  );
};

interface AdminBlockInterface {
  contextDependsParam: string[];
  context: any;
  config: {
    type: string;
    permissions: {
      allow?: string[];
      deny?: string[];
    };
    blocks: any[];
    dataSource: DataSourceInterface<any>;
    actions: ActionsInterface;
    config: any;
    name?: string;
  };
  updateState: (data: any) => void;
}
const AdminBlock = ({ config, context, updateState }: AdminBlockInterface) => {
  const [Cmp, setCmp] = useState<FC<AdminComponentInterface>>();

  const data = useDataSource(config.dataSource, {
    context: context,
    updatePageState: updateState,
  });
  const actions = buildActions(config.actions, {
    context: context,
    updatePageState: updateState,
  });

  useEffect(() => {
    loadComponent(config.type, setCmp);
    // eslint-disable-next-line
  }, []);

  if (!Cmp) {
    return null;
  }
  return (
    <Container>
      <Paper elevation={3}>
        <Cmp {...config} context={context} data={data} actions={actions} />
      </Paper>
    </Container>
  );
};

export default pipe(
  () => AdminBlock,
  (cmp) =>
    pureConnect(cmp, ({ contextDependsParam }) => {
      const context = pageState.getState();
      const updateState = useCallback(context._updatePageState, []);

      const refererContext = contextDependsParam
        ? contextDependsParam.reduce((acc, dependPropPath) => {
            const dependPath = dependPropPath.split(".");
            return assocPath(dependPath, path(dependPath, context), acc);
          }, {} as object)
        : {};

      return {
        contextDependsParam,
        context: refererContext,
        updateState,
      };
    }),
  calculateContextDependency,
  withPerformance(["context", "contextDependsParam", "updateState"]),
  React.memo,
)();
