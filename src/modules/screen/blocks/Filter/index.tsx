import React from "react";
import { observer } from "mobx-react-lite";

import { BlockInterface } from "state/globalState";

function FilterBlock({}: BlockInterface<{}[]>) {
  return null;
}

export default React.memo(observer(FilterBlock));
