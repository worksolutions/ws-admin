import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Resizer from "primitives/Resizer";
import Input, { InputSize } from "primitives/Input";
import Button, { ButtonSize } from "primitives/Button";

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
  const [search, setSearch] = React.useState("");
  return (
    <Resizer initialWidth={272} styles={backgroundColor("gray-blue/01")}>
      <Wrapper
        styles={[overflow("hidden"), minHeight("100vh"), maxHeight("100vh"), fullWidth, padding("16px 8px 0px 8px")]}
      >
        <Wrapper styles={[padding("0 8px 8px 8px")]}>
          <Input
            size={InputSize.MEDIUM}
            iconLeft="search-big"
            placeholder="Найти раздел"
            value={search}
            onChange={setSearch}
          />
          <Button size={ButtonSize.MEDIUM} onClick={console.log}>
            test
          </Button>
          <Button size={ButtonSize.MEDIUM} iconLeft="search-big" onClick={console.log}>
            test
          </Button>
          <Button size={ButtonSize.MEDIUM} iconRight="search-big" onClick={console.log}>
            test
          </Button>
          <Button size={ButtonSize.MEDIUM} iconLeft="search-big" onClick={console.log} iconRight="search-big">
            test
          </Button>
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
