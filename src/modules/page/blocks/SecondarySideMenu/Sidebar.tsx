import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Resizer from "primitives/Resizer";

import {
  ai,
  Aligns,
  backgroundColor,
  flex,
  fullWidth,
  jc,
  marginTop,
  maxHeight,
  minHeight,
  overflow,
  padding,
} from "libs/styles";

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
    <Resizer initialWidth={272} styles={backgroundColor("gray-blue/01")}>
      <Wrapper
        styles={[overflow("hidden"), minHeight("100vh"), maxHeight("100vh"), fullWidth, padding("16px 8px 0px 8px")]}
      >
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
    </Resizer>
  );
}

export default React.memo(SecondaryMenuSidebar);
