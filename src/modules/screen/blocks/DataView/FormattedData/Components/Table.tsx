import React from "react";
import { observer } from "mobx-react-lite";
import { assocPath } from "ramda";

import Wrapper from "primitives/Wrapper";

import { flexValue, fullWidth, marginTop, overflow, position } from "libs/styles";

import TableViewBlock from "../../Table";
import { FormattedDataViewInterface } from "../types";
import { ViewMetaData } from "../../types";

import { AnyAction } from "types/Actions";

interface TableComponentsProps {
  notFound: React.ReactNode;
  spinner: React.ReactNode;
  options: FormattedDataViewInterface["options"];
  setMetaData: (meta: ViewMetaData) => void;
  actions: { sorting: AnyAction };
}

function TableComponent({ options, notFound, spinner, setMetaData, actions }: TableComponentsProps) {
  const tableViewOptions = React.useMemo(
    () => assocPath(["options", "id"], `${options!.id}-table`, options!.tableView),
    [],
  );

  return (
    <Wrapper styles={[position("relative"), fullWidth, overflow("hidden"), flexValue(1), marginTop(8)]}>
      {notFound}
      <TableViewBlock {...tableViewOptions} onUpdateMeta={setMetaData} actions={actions} />
      {spinner}
    </Wrapper>
  );
}

export default React.memo(observer(TableComponent));
