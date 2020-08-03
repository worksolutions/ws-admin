import React from "react";

import Icon from "primitives/Icon";
import Typography from "primitives/Typography";

import { marginRight, minHeight, verticalPadding } from "libs/styles";

import { CellComponentData } from "../types";

export const cellComponent: CellComponentData = ({ item: { icon, value }, linkWrapper }) => {
  const iconElement = icon && <Icon icon={icon.name} color={icon.color} styles={marginRight(8)} />;

  const component = linkWrapper ? (
    linkWrapper(
      <>
        {iconElement}
        {value}
      </>,
      [minHeight("100%"), verticalPadding(2)],
    )
  ) : (
    <>
      {iconElement}
      <Typography styles={[verticalPadding(2)]}>{value}</Typography>
    </>
  );

  return {
    component,
    cellWidth: "initial",
  };
};
