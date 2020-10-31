import React, { memo, useMemo } from "react";

import { Aligns, paddingTop } from "libs/styles";

import GroupedFieldsList from "./InnerGroupedFieldsList";
import { AlignFieldsRowConfigInterface, GroupedFieldsListInterface } from "./types";

const configAlignField: AlignFieldsRowConfigInterface = {
  vertical: {
    alignFieldRow: Aligns.START,
    titleStyles: [paddingTop(10)],
  },
  horizontal: {
    alignFieldRow: Aligns.START,
  },
};

const GroupedFieldsOnEdit = (props: GroupedFieldsListInterface) => {
  const alignConfig = useMemo(() => configAlignField, [configAlignField]);

  return <GroupedFieldsList {...props} alignConfig={alignConfig} />;
};

export default memo(GroupedFieldsOnEdit);
