import React from "react";

import GroupedFieldsList, { GroupedFieldsListInterface } from "./GroupedFieldsList";

function StaticGroupedFieldsList(props: GroupedFieldsListInterface) {
  return <GroupedFieldsList {...props} viewMode="static" />;
}

export default React.memo(StaticGroupedFieldsList);
