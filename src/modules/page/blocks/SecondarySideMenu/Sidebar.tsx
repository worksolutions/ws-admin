import React from "react";

import Wrapper from "primitives/Wrapper";
import Icon, { Icons } from "primitives/Icon";
import Typography from "primitives/Typography";

import {
  ai,
  Aligns,
  backgroundColor,
  borderRadius,
  child,
  color,
  fillColor,
  flex,
  fullWidth,
  hover,
  jc,
  marginLeft,
  marginRight,
  marginTop,
  minHeight,
  padding,
  pointer,
  transform,
  transition,
  width,
} from "libs/styles";
import { useBoolean } from "libs/hooks";

interface SidebarItemInterface {
  name: string;
  to: string;
  icon?: Icons;
  subElements?: SidebarItemInterface[];
}

export interface SecondaryMenuSidebarInterface {
  title: string;
  opened: boolean;
  items: SidebarItemInterface[];
  onChangeOpened: (opened: boolean) => void;
}

const oneLevelPaddingLeft = 32;

function RecursiveTree({ item, level }: { item: SidebarItemInterface; level: number }) {
  const [opened, open, close] = useBoolean(false);

  function toggle() {
    if (opened) {
      close();
      return;
    }
    open();
  }

  const nextLevel = level + 1;
  return (
    <>
      <Wrapper
        styles={[
          pointer,
          padding("8px 10px"),
          fullWidth,
          borderRadius(4),
          transition("all 0.2s"),
          flex,
          ai(Aligns.CENTER),
          child([transition("all 0.2s")], ".item-icon, .item-icon use"),
          hover([backgroundColor("gray-blue/04")]),
          hover([fillColor("white")], ".item-icon use"),
          hover([color("white")], ".item-text"),
        ]}
        onClick={toggle}
      >
        <Icon
          className="item-icon"
          color="gray-blue/07"
          width={16}
          height={16}
          styles={[marginRight(4), marginLeft(oneLevelPaddingLeft * level), opened && transform("rotateZ(90deg)")]}
          iconName={item.subElements ? "16-triangle-right" : "16-small-circle"}
        />
        {(item.icon || item.subElements) && (
          <Icon
            className="item-icon"
            color="blue/09"
            styles={[marginRight(8)]}
            iconName={item.icon || "folder-outline"}
          />
        )}
        <Typography dots styles={transition("all 0.2s")} className="item-text" color="gray-blue/09">
          {item.name}
        </Typography>
      </Wrapper>
      {item.subElements &&
        opened &&
        item.subElements.map((element) => <RecursiveTree key={element.to} level={nextLevel} item={element} />)}
    </>
  );
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
        <RecursiveTree key={key} item={item} level={0} />
      ))}
    </Wrapper>
  );
}

export default React.memo(SecondaryMenuSidebar);
