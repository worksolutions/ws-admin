import React, { FC, useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
  DataSourceInterface,
  DataSourceType,
} from "../../HOC/DataSource/DataSourceHOC";
import listDataSource from "../../HOC/DataSource/list/listDataSource";
import apiRequestDataSource from "../../HOC/DataSource/list/apiRequestDataSource";

import pageState from "state/page/state";
import { ActionsInterface, AdminComponentInterface } from "../../types";
import { RouteComponentProps, withRouter } from "react-router";
import { buildActions } from "../../componentBuilder/buildActions";

export const loadComponent = (type: string, cb: (cmp) => void) => {
  import(`commonComponents/${type}`).then(
    (module) => cb(module.default),
    console.error,
  );
};

export const useDataSource = (dataSource, context) => {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    if (!dataSource) return undefined;
    switch (dataSource.type) {
      case DataSourceType.LIST:
        listDataSource(dataSource).then(setData);
        break;
      case DataSourceType.API_REQUEST:
        apiRequestDataSource(dataSource, context).then(setData);
        break;
      default:
        console.error(
          `Указан неизвестный тип источника данных. [${dataSource.type}]`,
        );
        break;
    }
    // eslint-disable-next-line
  }, [context]);
  return data;
};

interface AdminBlockInterface {
  props: {
    type: string;
    permissions: {
      allow?: string[];
      deny?: string[];
    };
    dataSource: DataSourceInterface<any>;
    actions: ActionsInterface;
    config: any;
  };
}
const AdminBlock = withRouter(
  ({ props, history }: AdminBlockInterface & RouteComponentProps) => {
    const { context } = pageState.getState();
    const [Cmp, setCmp] = useState<FC<AdminComponentInterface>>();
    const data = useDataSource(props.dataSource, context);
    const actions = buildActions(props.actions, context, history);

    useEffect(() => {
      loadComponent(props.type, setCmp);
      // eslint-disable-next-line
    }, []);

    if (!Cmp) {
      return null;
    }

    console.log(actions);
    return (
      <Container>
        <Paper elevation={3}>
          <Cmp {...props} data={data} actions={actions} />
        </Paper>
      </Container>
    );
  },
);

export default React.memo(AdminBlock);
