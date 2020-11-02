import React, { memo } from "react";

import { GroupedFieldsListInterface } from "../types";

import InternalGroupedFieldsList from "./Internal/InternalGroupedFieldsList";

const GroupedFieldsOnEdit = (props: GroupedFieldsListInterface) => {
  return <InternalGroupedFieldsList {...props} isEditable />;
};

export default memo(GroupedFieldsOnEdit);
