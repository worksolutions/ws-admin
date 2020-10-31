import React, { memo, useMemo } from "react";

import { Aligns, paddingTop } from "libs/styles";

import GroupedFieldsList from "./InnerGroupedFieldsList";
import { FieldListInterface } from "./FieldsList/types";
import { AlignFieldsRowConfigInterface } from "./types";

import { BlockInterface } from "state/globalState";

type GroupedFieldsListInterface = BlockInterface<{ title: string; fieldList: FieldListInterface }[]>;

const configAlign: AlignFieldsRowConfigInterface = {
  vertical: {
    alignFieldRow: Aligns.CENTER,
    titleStyles: [paddingTop(0)],
  },
  horizontal: {
    alignFieldRow: Aligns.START,
  },
};

const GroupedFieldsOnView = (props: GroupedFieldsListInterface) => {
  const alignConfig = useMemo(() => configAlign, [configAlign]);

  return <GroupedFieldsList {...props} alignConfig={alignConfig} />;
};

export default memo(GroupedFieldsOnView);
