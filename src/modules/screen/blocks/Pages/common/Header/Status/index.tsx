import React from "react";
import { observer } from "mobx-react-lite";
import { propEq } from "ramda";

import Loading from "components/LoadingContainer/Loading";

import { useDataSource } from "modules/context/dataSource/useDataSource";
import { insertContext } from "modules/context/insertContext";
import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import StaticStatusBar from "./StaticStatusBar";
import DynamicStatusBar, { DynamicStatusBarItem } from "./DynamicStatusBar";

import { BlockInterface } from "state/globalState";

export type StatusInterface = BlockInterface<
  {
    value: string;
  },
  "change"
>;

function Status({ styles, status }: { status: StatusInterface; styles?: any }) {
  const appContext = useAppContext();
  const { data, loadingContainer } = useDataSource<DynamicStatusBarItem[]>(status.dataSource!, []);
  const enhancedValue = insertContext(status.options!.value, appContext.context);
  const action = useActions(status.actions!, useAppContext());

  const item = React.useMemo(() => data!.find(propEq("code", enhancedValue.value)), [data, enhancedValue.value]);

  if (loadingContainer.loading) return <Loading />;

  return action.change ? (
    <DynamicStatusBar styles={styles} item={item} items={data!} onChange={(code) => action.change.run(code)} />
  ) : item ? (
    <StaticStatusBar styles={styles} title={item.title} badgeColor={item.badgeColor} />
  ) : null;
}

export default React.memo(observer(Status));
