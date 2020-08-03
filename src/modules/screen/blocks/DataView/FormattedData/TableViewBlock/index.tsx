import React from "react";
import { observer } from "mobx-react-lite";
import { assocPath } from "ramda";

import Wrapper from "primitives/Wrapper";

import { flexValue, fullWidth, overflow, position } from "libs/styles";

import { TableViewConfigInterface } from "../types";
import { ViewMetaData } from "../../types";

import TableViewBlock from "./Table";

import { AnyAction } from "types/Actions";

interface TableViewBlockInterface {
  notFound: React.ReactNode;
  spinner: React.ReactNode;
  id: string;
  options: TableViewConfigInterface;
  setMetaData: (meta: ViewMetaData) => void;
  actions: { sorting: AnyAction };
}

function TableViewBlockWrapper({ id, options, notFound, spinner, setMetaData, actions }: TableViewBlockInterface) {
  const tableViewOptions = React.useMemo(() => assocPath(["options", "id"], `${id}-table`, options), []);

  return (
    <Wrapper styles={[position("relative"), fullWidth, overflow("hidden"), flexValue(1)]}>
      {notFound}
      <TableViewBlock {...tableViewOptions} onUpdateMeta={setMetaData} actions={actions} />
      {spinner}
    </Wrapper>
  );
}

export default React.memo(observer(TableViewBlockWrapper));
