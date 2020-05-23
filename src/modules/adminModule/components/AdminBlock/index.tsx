import React, { FC, useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
  DataSourceInterface,
  useDataSource,
} from "../../HOC/DataSource/DataSourceHOC";

import { ActionsInterface, AdminComponentInterface } from "../../types";
import { buildActions } from "../../componentBuilder/buildActions";
import pageState from "state/page/state";

export const loadComponent = (type: string, cb: (cmp) => void) => {
  import(`commonComponents/${type}`).then(
    (module) => cb(module.default),
    console.error,
  );
};

interface AdminBlockInterface {
  props: {
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
}
const AdminBlock = React.memo(({ props }: AdminBlockInterface) => {
  const [Cmp, setCmp] = useState<FC<AdminComponentInterface>>();
  const context = pageState.getState();

  const data = useDataSource(props.dataSource, {
    context: context,
    updatePageState: context._updatePageState,
  });
  const actions = buildActions(props.actions, {
    context: context,
    updatePageState: context._updatePageState,
  });

  useEffect(() => {
    loadComponent(props.type, setCmp);
    // eslint-disable-next-line
  }, []);

  if (!Cmp) {
    return null;
  }
  console.log(props.name);

  return (
    <Container>
      <Paper elevation={3}>
        <Cmp {...props} data={data} actions={actions} />
      </Paper>
    </Container>
  );
});

export default React.memo(AdminBlock);
