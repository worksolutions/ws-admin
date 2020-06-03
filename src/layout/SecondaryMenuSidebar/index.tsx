import React from "react";

import Wrapper from "primitives/Wrapper";
import { Icons } from "primitives/Icon";
import Typography from "primitives/Typography";

import { ai, Aligns, backgroundColor, flex, fullHeight, jc, marginLeft, padding, width } from "libs/styles";

interface SidebarItemInterface {
  icon: Icons;
  selected: boolean;
  href: string;
  items?: SidebarItemInterface[];
}

export interface SecondaryMenuSidebarInterface {
  title: string;
  opened: boolean;
  items: SidebarItemInterface[];
  onChangeOpened: (opened: boolean) => void;
}

function SecondaryMenuSidebar({ title }: SecondaryMenuSidebarInterface) {
  return (
    <Wrapper
      styles={[backgroundColor("gray-blue/01"), fullHeight, width(272), padding("32px 8px 0px 8px"), marginLeft(56)]}
    >
      <Wrapper styles={[flex, ai(Aligns.CENTER), jc(Aligns.SPACE_BETWEEN)]}>
        <Typography>{title}</Typography>
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(SecondaryMenuSidebar);
