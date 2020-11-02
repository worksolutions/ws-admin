import React from "react";
import { toJS } from "mobx";

import HorizontalFieldsList from "./Horizontal";
import VerticalFieldsList from "./Vertical";
import { FieldListComponentInterface, FieldListItemMode } from "./types";

function FieldsList({
  options,
  forceTitleWidth,
  onCalculateTitleWidth,
  useTitleWidthCalculation,
  styles,
  alignConfig,
}: FieldListComponentInterface) {
  console.log("options ", toJS(options));

  const mode = options!.mode || FieldListItemMode.HORIZONTAL;

  return mode === FieldListItemMode.HORIZONTAL ? (
    <HorizontalFieldsList
      styles={styles}
      options={options}
      alignConfig={alignConfig}
      forceTitleWidth={forceTitleWidth}
      onCalculateTitleWidth={onCalculateTitleWidth}
    />
  ) : (
    <VerticalFieldsList
      useTitleWidthCalculation={useTitleWidthCalculation}
      styles={styles}
      options={options}
      alignConfig={alignConfig}
      forceTitleWidth={forceTitleWidth}
      onCalculateTitleWidth={onCalculateTitleWidth}
    />
  );
}

export default React.memo(FieldsList);
