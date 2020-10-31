import React, { memo, useMemo } from "react";

import { Aligns, paddingTop } from "libs/styles";

import GroupedFieldsList from "./InnerGroupedFieldsList";
import { FieldListInterface } from "./FieldsList/types";
import { AlignFieldsRowConfigInterface } from "./types";

import { BlockInterface } from "state/globalState";

type GroupedFieldsListInterface = BlockInterface<{ title: string; fieldList: FieldListInterface }[]>;

const configAlign: AlignFieldsRowConfigInterface = {
  vertical: {
    alignFieldRow: Aligns.START,
    titleStyles: [paddingTop(10)],
  },
  horizontal: {
    alignFieldRow: Aligns.START,
  },
};

const GroupedFieldsOnEdit = (props: GroupedFieldsListInterface) => {
  const alignConfig = useMemo(() => configAlign, [configAlign]);

  return <GroupedFieldsList {...props} alignConfig={alignConfig} />;
};

export default memo(GroupedFieldsOnEdit);
