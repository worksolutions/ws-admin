import { useEffect, useState } from "react";
import { isNil } from "ramda";

import { useAppContext } from "../hooks/useAppContext";

import { runContextDataSourceFetcher } from "./sourceFetchers/context";
import { runListDataSourceFetcher } from "./sourceFetchers/list";
import { runApiRequestDataSourceFetcher } from "./sourceFetchers/apiRequest";

import { AnyDataSource } from "types/DataSource";

export function useDataSource<RESULT = any>(dataSource: AnyDataSource) {
  if (!dataSource) return;

  const { context, updateState } = useAppContext();
  const [data, setData] = useState<RESULT>();

  function onDataReceived(data: any) {
    if (isNil(data)) return;
    setData(data);
    if (dataSource.context) {
      updateState({
        path: dataSource.context,
        data,
      });
    }
  }

  function runDataSourceFetcher() {
    runListDataSourceFetcher(dataSource, onDataReceived);
    runContextDataSourceFetcher(dataSource, context, onDataReceived);
    runApiRequestDataSourceFetcher(dataSource, context, onDataReceived);
  }

  useEffect(runDataSourceFetcher, []);

  return data;
}
