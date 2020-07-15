import React from "react";
import { useMeasure } from "react-use";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Resizer from "primitives/Resizer";
import Input, { InputSize } from "primitives/Input/Input";

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
  position,
  width,
} from "libs/styles";

import { SidebarItemInterface } from "../types";

import { RecursiveTreeElement } from "./RecursiveTreeElement";

export interface SecondaryMenuSidebarInterface {
  title: string;
  items: SidebarItemInterface[];
  id?: string;
}

function SecondaryMenuSidebar({ title, items, id }: SecondaryMenuSidebarInterface) {
  const [search, setSearch] = React.useState("");
  const [measureRef, bounds] = useMeasure();

  return (
    <>
      <Resizer
        ref={measureRef as any}
        localStorageKey={id}
        initialWidth={272}
        styles={[backgroundColor("gray-blue/01"), position("fixed")]}
      >
        <Wrapper
          styles={[overflow("hidden"), minHeight("100vh"), maxHeight("100vh"), fullWidth, padding("16px 8px 0px 8px")]}
        >
          <Wrapper styles={[padding("0 8px 12px 8px")]}>
            <Input
              size={InputSize.MEDIUM}
              iconLeft="search-big"
              placeholder="Найти раздел"
              value={search}
              onChange={setSearch}
            />
            <Wrapper styles={[flex, ai(Aligns.CENTER), jc(Aligns.SPACE_BETWEEN), marginTop(12)]}>
              <Typography type="h1-bold">{title}</Typography>
            </Wrapper>
          </Wrapper>
          {items.map((item, key) => (
            <RecursiveTreeElement key={key} item={item} level={0} />
          ))}
        </Wrapper>
      </Resizer>
      <Wrapper styles={width(bounds.width)} />
    </>
  );
}

export default React.memo(SecondaryMenuSidebar);
