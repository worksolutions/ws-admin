import React from "react";

import HorizontalFieldsList from "./Horizontal";
import VerticalFieldsList from "./Vertical";
import { FieldListComponentInterface, FieldListComponentViewMode, FieldListItemMode } from "./types";

function FieldsList({
  viewMode,
  options,
  forceTitleWidth,
  onCalculateTitleWidth,
  useTitleWidthCalculation,
  styles,
}: FieldListComponentInterface & { viewMode: FieldListComponentViewMode }) {
  const mode = options!.mode || FieldListItemMode.HORIZONTAL;

  return mode === FieldListItemMode.HORIZONTAL ? (
    <HorizontalFieldsList
      viewMode={viewMode}
      useTitleWidthCalculation={useTitleWidthCalculation}
      styles={styles}
      options={options}
      forceTitleWidth={forceTitleWidth}
      onCalculateTitleWidth={onCalculateTitleWidth}
    />
  ) : (
    <VerticalFieldsList
      styles={styles}
      options={options}
      forceTitleWidth={forceTitleWidth}
      onCalculateTitleWidth={onCalculateTitleWidth}
    />
  );
}

export default React.memo(FieldsList);
