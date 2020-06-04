import React, { FC, useState } from "react";

import { AdminComponentInterface } from "../../types";
import { DataSourceInterface, DataSourceType } from "../../../../types/DataSource";
import listDataSource from "../../../context/dataSource/sources/listDataSource";
import apiRequestDataSource from "../../../context/dataSource/sources/apiRequestDataSource";
import fromContextDataSource from "../../../context/dataSource/sources/fromContextDataSource";

export default function <P>(Cmp: FC<P & AdminComponentInterface>, state: any) {
  return function (props: P & { dataSource: DataSourceInterface<any> }) {
    const { dataSource } = props;

    const [data, setData] = useState(undefined);

    switch (dataSource.type) {
      case DataSourceType.LIST:
        listDataSource(dataSource).then(setData);
        break;
      case DataSourceType.API_REQUEST:
        apiRequestDataSource(dataSource, state).then(setData);
        break;
      case DataSourceType.CONTEXT:
        fromContextDataSource(dataSource, state).then(setData);
        break;
      default:
        console.error(`Указан неизвестный тип источника данных. [${dataSource.type}]`);
        break;
    }

    if (data === undefined) {
      return null;
    }
    // @ts-ignore
    return <Cmp {...(props as P)} data={data} />;
  };
}
