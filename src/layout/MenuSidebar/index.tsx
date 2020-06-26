import React from "react";

import Wrapper from "primitives/Wrapper";
import Icon, { Icons } from "primitives/Icon";
import LinkWrapper from "primitives/LinkWrapper";
import Hint from "primitives/Popper/Hint";

import {
  ai,
  Aligns,
  backgroundColor,
  borderRadius,
  flex,
  flexColumn,
  flexValue,
  fullHeight,
  height,
  hover,
  jc,
  marginBottom,
  padding,
  position,
  transition,
  width,
  focus,
  disableOutline,
  border,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  fullWidth,
  minHeight,
  zIndex,
  boxShadow,
  createAlphaColor,
} from "libs/styles";

import SuggestInterface from "types/SuggestInterface";

interface BaseIconButtonInterface {
  icon: Icons;
  selected: boolean;
  href: string;
  hint?: string;
  styles?: any;
}

const IconLink = React.memo(function ({ icon, selected, href, hint, styles }: BaseIconButtonInterface) {
  return (
    <Hint text={hint} margin={16}>
      {(initParent) => (
        <LinkWrapper
          ref={initParent}
          to={href}
          styles={[
            width(40),
            height(40),
            borderRadius(4),
            flex,
            ai(Aligns.CENTER),
            jc(Aligns.CENTER),
            transition("background-color 0.2s"),
            disableOutline,
            selected
              ? [
                  backgroundColor("blue/05"),
                  boxShadow([0, 2, 6, createAlphaColor("black", 10)], [0, 8, 16, createAlphaColor("black", 20)]),
                ]
              : hover(backgroundColor("gray-blue/01")),
            styles,
          ]}
        >
          <Icon iconName={icon} color={selected ? "white" : "blue/09"} />
        </LinkWrapper>
      )}
    </Hint>
  );
});

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
  secondaryItems: SidebarItemInterface[];
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
        <Wrapper
          styles={[
            backgroundImage(logo),
            backgroundSize("cover"),
            backgroundPosition("center"),
            width(56),
            minHeight(56),
          ]}
        />
      )}
      <Wrapper styles={[flexValue(1), fullWidth, flex, flexColumn, padding("16px 8px 20px 8px")]}>
        <Wrapper styles={[flex, flexColumn, flexValue(1)]}>
          {primaryItems.map((item, key) => (
            <IconLink key={key} styles={marginBottom(8)} {...item} />
          ))}
        </Wrapper>
        <Wrapper styles={[flex, flexColumn]}>
          {secondaryItems.map((item, key) => (
            <IconLink key={key} styles={marginBottom(8)} {...item} />
          ))}
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(MenuSidebar);
