import React from "react";
import { useMeasure } from "react-use";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Resizer from "primitives/Resizer";
import Input, { InputSize } from "primitives/Input/Input";
import ClearInputWrapper from "primitives/Input/ClearInputWrapper";
import Icon, { Icons } from "primitives/Icon";

import {
  ai,
  Aligns,
  backgroundColor,
  flex,
  flexColumn,
  flexGrow,
  flexValue,
  fullWidth,
  height,
  jc,
  lineHeight,
  marginRight,
  marginTop,
  maxHeight,
  minHeight,
  overflow,
  padding,
  paddingLeft,
  position,
  width,
  zIndex,
} from "libs/styles";

import { RecursiveTreeElement } from "./RecursiveTreeElement";

export interface SidebarItemInterface {
  name: string;
  reference: string;
  icon?: Icons;
  subElements?: SidebarItemInterface[];
}

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
        styles={[zIndex(4), backgroundColor("gray-blue/01"), position("fixed")]}
      >
        <Wrapper
          styles={[
            flex,
            flexColumn,
            overflow("hidden"),
            minHeight("100vh"),
            maxHeight("100vh"),
            fullWidth,
            padding("16px 8px"),
          ]}
        >
          <Wrapper styles={[padding("0 0 12px 8px")]}>
            <ClearInputWrapper needShow={!!search} clear={() => setSearch("")}>
              <Input
                outerStyles={flexValue(1)}
                size={InputSize.MEDIUM}
                iconLeft="search-big"
                placeholder="Найти раздел"
                value={search}
                onChange={setSearch}
              />
            </ClearInputWrapper>
            <Wrapper styles={[flex, ai(Aligns.CENTER), jc(Aligns.SPACE_BETWEEN), marginTop(12)]}>
              <Typography type="h1-bold">{title}</Typography>
            </Wrapper>
          </Wrapper>
          <Wrapper styles={[flexGrow(1)]}>
            {items.map(
              (item, key) =>
                item.name.toLowerCase().startsWith(search.toLowerCase()) && (
                  <RecursiveTreeElement key={key} item={item} level={0} />
                ),
            )}
          </Wrapper>
          <Wrapper styles={[height(64), fullWidth, flex, ai(Aligns.END), jc(Aligns.SPACE_BETWEEN)]}>
            <Wrapper styles={[flex, flexColumn, paddingLeft(8)]}>
              <Typography color="gray-blue/04">2020</Typography>
              <Typography color="gray-blue/04">© Work Solutions</Typography>
            </Wrapper>
            <Wrapper styles={[lineHeight(20), marginRight(8)]}>
              <Icon width={66} height={48} icon="/ws-logo-mono-black.svg" color="gray-blue/04" />
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Resizer>
      <Wrapper styles={width(bounds.width)} />
    </>
  );
}

export default React.memo(SecondaryMenuSidebar);
