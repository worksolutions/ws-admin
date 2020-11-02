import React, { memo, useMemo } from "react";

import { Aligns, paddingTop } from "libs/styles";

import GroupedFieldsList from "./InternalGroupedFieldsList";
import { AlignFieldsRowConfigInterface, GroupedFieldsListInterface } from "./types";
import { AlignContainerFieldsListInterface } from "./FieldsList/types";
import AlignContainerFieldsList from "./FieldsList/AlignContainerFieldsList";

const GroupedFieldsOnView = (props: AlignContainerFieldsListInterface) => (
  <AlignContainerFieldsList {...props} isEditable={false} />
);

export default memo(GroupedFieldsOnView);
