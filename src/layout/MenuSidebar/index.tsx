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
    <Hint text={hint}>
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
            focus([border(2, "blue/01")]),
            selected ? backgroundColor("blue/05") : hover(backgroundColor("blue/09")),
            styles,
          ]}
        >
          <Icon iconName={icon} color={selected ? "white" : "blue/02"} />
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
      styles={[backgroundColor("blue/10"), position("fixed"), fullHeight, width(sidebarWidth), flex, flexColumn]}
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
