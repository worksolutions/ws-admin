import { observe } from "mobx";
import { isNil } from "ramda";

import { AppContextStateInterface } from "../../hooks/useAppContext";
import fromContextDataSource from "../sources/fromContextDataSource";

import { AnyDataSource, DataSourceType } from "types/DataSource";

const disposeAllHandlers = (disposers: (() => void)[]) => disposers.forEach((func) => func());

export function runContextDataSourceFetcher(
  dataSource: AnyDataSource,
  context: AppContextStateInterface,
  onDataReceived: (data: any) => void,
) {
  if (dataSource.type !== DataSourceType.CONTEXT) return;

  const disposers = [observe(context.screen, run), observe(context.global, run)];

  function run() {
    disposeAllHandlers(disposers);
    runContextDataSourceFetcher(dataSource, context, onDataReceived);
  }

  fromContextDataSource(dataSource, context).then((value) => {
    if (isNil(value)) return;
    onDataReceived(value);
  });
}
