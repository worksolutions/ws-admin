import React from "react";

import Wrapper from "primitives/Wrapper";

import Avatar from "components/Avatar";

import { ai, Aligns, flex, marginRight, verticalPadding } from "libs/styles";

import { CellComponentData } from "../types";

import { cellComponent as stringCellComponent } from "./string";

export const cellComponent: CellComponentData = ({ item: { name, reference, avatarReference }, column }) => {
  return {
    component: stringCellComponent({
      item: {
        redirectReference: reference,
        styles: verticalPadding(0),
        value: (
          <Wrapper as="span" styles={[flex, ai(Aligns.CENTER)]}>
            <Avatar size={32} styles={marginRight(12)} reference={avatarReference} />
            {name}
          </Wrapper>
        ),
      },
      column,
    }).component,
    cellWidth: "initial",
  };
};
