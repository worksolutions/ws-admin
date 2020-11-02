import React, { memo } from "react";

import AlignContainerFieldsList from "./FieldsList/AlignContainerFieldsList";
import { AlignContainerFieldsListInterface } from "./FieldsList/types";

const GroupedFieldsOnEdit = (props: AlignContainerFieldsListInterface) => (
  <AlignContainerFieldsList {...props} isEditable />
);

export default memo(GroupedFieldsOnEdit);
