import React from "react";

import ImageWithDefault from "primitives/ImageWithDefault";

import { border, borderRadius } from "libs/styles";
import { isPureObject } from "libs/is";

import { CellComponentData } from "../types";
import { TableSizes } from "../../../types";
import { cellDefaultHorizontalPadding } from "../../../libs/paddings";

const imageHeightsForHeightConfigBySize: Record<TableSizes, number> = {
  [TableSizes.LARGE]: 48,
  [TableSizes.MEDIUM]: 32,
  [TableSizes.SMALL]: 24,
};

export const cellComponent: CellComponentData = ({ item, column }) => {
  const value = isPureObject(item) ? item.value : item;

  const imageConfig = column.options!.imageConfig!;
  return {
    component: (
      <ImageWithDefault
        src={value}
        width="100%"
        aspectRatio={column.options!.imageConfig!.aspectRatio}
        styles={[border(1, "gray-blue/02"), borderRadius(4)]}
        emptyIcon="16-no-image"
        emptyIconSize={16}
      />
    ),
    cellWidth:
      cellDefaultHorizontalPadding +
      Math.ceil(imageHeightsForHeightConfigBySize[imageConfig.heightConfig] * imageConfig.aspectRatio),
  };
};
