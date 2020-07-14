import React from "react";

import Typography from "primitives/Typography";

import { BlockInterface } from "state/systemState";

function SimpleText({ options }: BlockInterface<{ text: string | number }>) {
  return <Typography>{options!.text}</Typography>;
}

export default React.memo(SimpleText);
