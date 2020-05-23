import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
  DataSourceInterface,
  DataSourceType,
} from "../../HOC/DataSource/DataSourceHOC";
import pageState from "../../../../state/page/state";
import listDataSource from "../../HOC/DataSource/list/listDataSource";
import apiRequestDataSource from "../../HOC/DataSource/list/apiRequestDataSource";

const loadComponent = (type: string, cb: (cmp) => void) => {
  console.log(1231);

  import(`commonComponents/${type}`)
    .then((module) => {
      console.log("module", module);
      cb(module.default);
    }, console.error)
    .catch(console.error)
    .finally(() => console.log("end"));
};

const useDataSource = (dataSource, context) => {
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
    config: any;
  };
}
const AdminBlock = ({ props }: AdminBlockInterface) => {
  const { state } = pageState.getState();
  const [Cmp, setCmp] = useState();

  import(`commonComponents/Test`)
    .then((module) => {
      console.log("module", module);
      setCmp(() => module.default as any);
    }, console.error)
    .catch(console.error)
    .finally(() => console.log("end"));

  useEffect(() => {
    loadComponent(props.type, setCmp);
    // eslint-disable-next-line
  }, []);

  const dataSource = useDataSource(props.dataSource, state);

  if (!Cmp) {
    return null;
  }

  return (
    <Container>
      <Paper elevation={3}>
        <Cmp {...props} dataSource={dataSource} />
      </Paper>
    </Container>
  );
};

export default React.memo(AdminBlock);
