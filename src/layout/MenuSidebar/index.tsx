import React from "react";

import Wrapper from "primitives/Wrapper";
import { Icons } from "primitives/Icon";

import {
  backgroundColor,
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  boxShadow,
  createAlphaColor,
  flex,
  flexColumn,
  flexValue,
  fullHeight,
  fullWidth,
  marginBottom,
  minHeight,
  padding,
  position,
  width,
  zIndex,
} from "libs/styles";

import { BaseIconButtonInterface, IconLink } from "./Element";

import SuggestInterface from "types/SuggestInterface";

type SidebarItemInterface = BaseIconButtonInterface &
  (
    | {
        type: "button";
      }
    | {
        type: "dropdown";
        dropdownItems: SuggestInterface[];
      }
  );

export interface MenuSidebarInterface {
  logo?: string;
  primaryItems: SidebarItemInterface[];
  secondaryItems: (SidebarItemInterface | null)[];
}

export const sidebarWidth = 56;

function MenuSidebar({ logo, primaryItems, secondaryItems }: MenuSidebarInterface) {
  return (
    <Wrapper
      styles={[
        backgroundColor("white"),
        boxShadow([0, 2, 6, createAlphaColor("black", 10)], [0, 8, 16, createAlphaColor("black", 20)]),
        position("fixed"),
        fullHeight,
        width(sidebarWidth),
        flex,
        flexColumn,
        zIndex(1),
      ]}
    >
      {logo && (
        <Wrapper styles={[backgroundColor("blue/05"), width(56), minHeight(56), padding(8)]}>
          <Wrapper
            styles={[
              backgroundImage(logo),
              backgroundSize("cover"),
              backgroundPosition("center"),
              fullWidth,
              fullHeight,
            ]}
          />
        </Wrapper>
      )}
      <Wrapper styles={[flexValue(1), fullWidth, flex, flexColumn, padding("16px 8px 20px 8px")]}>
        <Wrapper styles={[flex, flexColumn, flexValue(1)]}>
          {primaryItems.map((item, key) => (
            <IconLink key={key} {...item} styles={marginBottom(8)} />
          ))}
        </Wrapper>
        <Wrapper styles={[flex, flexColumn]}>
          {secondaryItems.map((item, key) => (item ? <IconLink key={key} {...item} styles={marginBottom(8)} /> : null))}
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(MenuSidebar);
