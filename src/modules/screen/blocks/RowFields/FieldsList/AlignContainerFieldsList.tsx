import React, { memo, useMemo } from "react";

import FieldsList from "./index";
import { AlignContainerFieldsListInterface } from "./types";
import { alignConfigEditable, alignConfigNotEditable } from "./configs";

const AlignContainerFieldsList = ({ isEditable, ...props }: AlignContainerFieldsListInterface) => {
  const config = useMemo(() => (isEditable ? alignConfigEditable : alignConfigNotEditable), [
    isEditable,
    alignConfigNotEditable,
    alignConfigEditable,
  ]);

  return <FieldsList {...props} alignConfig={config} />;
};

export default memo(AlignContainerFieldsList);
