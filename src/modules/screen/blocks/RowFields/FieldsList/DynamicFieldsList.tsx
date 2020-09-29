import React from "react";

import FieldsList from "./index";
import { FieldListComponentInterface } from "./types";

function StaticFieldsList(props: FieldListComponentInterface) {
  return <FieldsList {...props} viewMode="dynamic" />;
}

export default React.memo(StaticFieldsList);
