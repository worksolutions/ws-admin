import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import { ai, Aligns, backgroundColor, flex, jc, marginTop, minHeight, padding, width } from "libs/styles";

import { RecursiveTreeElement } from "./RecursiveTreeElement";
import { SidebarItemInterface } from "./types";

export interface SecondaryMenuSidebarInterface {
  title: string;
  opened: boolean;
  items: SidebarItemInterface[];
  onChangeOpened: (opened: boolean) => void;
}

function SecondaryMenuSidebar({ title, items }: SecondaryMenuSidebarInterface) {
  return (
    <Wrapper styles={[backgroundColor("gray-blue/01"), minHeight("100vh"), width(272), padding("16px 8px 0px 8px")]}>
      <Wrapper styles={[padding("0 8px 8px 8px")]}>
        <input />
        <Wrapper styles={[flex, ai(Aligns.CENTER), jc(Aligns.SPACE_BETWEEN), marginTop(12)]}>
          <Typography type="h1">{title}</Typography>
        </Wrapper>
      </Wrapper>
      {items.map((item, key) => (
        <RecursiveTreeElement key={key} item={item} level={0} />
      ))}
    </Wrapper>
  );
}

export default React.memo(SecondaryMenuSidebar);
