import React, { memo } from "react";

import { GroupedFieldsListInterface } from "../types";

import InternalGroupedFieldsList from "./Internal/InternalGroupedFieldsList";

const GroupedFieldsOnView = (props: GroupedFieldsListInterface) => {
  return <InternalGroupedFieldsList {...props} isEditable={false} />;
};

export default memo(GroupedFieldsOnView);
