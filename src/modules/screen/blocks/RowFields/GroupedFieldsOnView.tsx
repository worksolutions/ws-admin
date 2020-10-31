import React, { memo, useMemo } from "react";

import { Aligns, paddingTop } from "libs/styles";

import GroupedFieldsList from "./InnerGroupedFieldsList";
import { AlignFieldsRowConfigInterface, GroupedFieldsListInterface } from "./types";

const configAlignField: AlignFieldsRowConfigInterface = {
  vertical: {
    alignFieldRow: Aligns.CENTER,
    titleStyles: [paddingTop(0)],
  },
  horizontal: {
    alignFieldRow: Aligns.START,
  },
};

const GroupedFieldsOnView = (props: GroupedFieldsListInterface) => {
  const alignConfig = useMemo(() => configAlignField, [configAlignField]);

  return <GroupedFieldsList {...props} alignConfig={alignConfig} />;
};

export default memo(GroupedFieldsOnView);
