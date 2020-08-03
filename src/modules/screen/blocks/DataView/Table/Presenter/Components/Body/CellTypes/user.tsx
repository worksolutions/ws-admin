import React from "react";

import Icon from "primitives/Icon";
import Wrapper from "primitives/Wrapper";

import {
  ai,
  Aligns,
  backgroundColor,
  border,
  borderRadius,
  createAlphaColor,
  flex,
  height,
  jc,
  marginRight,
  minWidth,
  verticalPadding,
  width,
} from "libs/styles";

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
            {avatarReference ? (
              <Icon
                icon={avatarReference}
                width={32}
                height={32}
                styles={[minWidth(32), marginRight(12), borderRadius("100%")]}
              />
            ) : (
              <Wrapper
                styles={[
                  marginRight(12),
                  minWidth(32),
                  width(32),
                  height(32),
                  border(1, createAlphaColor("black", 20)),
                  flex,
                  ai(Aligns.CENTER),
                  jc(Aligns.CENTER),
                  backgroundColor("gray-blue/01"),
                  borderRadius("100%"),
                ]}
              >
                <Icon icon="user" color="gray-blue/07" />
              </Wrapper>
            )}
            {name}
          </Wrapper>
        ),
      },
      column,
    }).component,
    cellWidth: "initial",
  };
};
