import React from "react";

import HorizontalFieldsList from "./Horizontal";
import VerticalFieldsList from "./Vertical";
import { FieldListComponentInterface, FieldListItemMode } from "./types";

function FieldsList({ options, forceTitleWidth, onCalculateTitleWidth }: FieldListComponentInterface) {
  const mode = options!.mode || FieldListItemMode.HORIZONTAL;

  return mode === FieldListItemMode.HORIZONTAL ? (
    <HorizontalFieldsList
      options={options}
      forceTitleWidth={forceTitleWidth}
      onCalculateTitleWidth={onCalculateTitleWidth}
    />
  ) : (
    <VerticalFieldsList
      options={options}
      forceTitleWidth={forceTitleWidth}
      onCalculateTitleWidth={onCalculateTitleWidth}
    />
  );
}

export default React.memo(FieldsList);
