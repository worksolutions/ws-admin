import React from "react";
import useMeasure from "react-use-measure";
import { animated, useSpring } from "react-spring";

import Wrapper from "primitives/Wrapper";
import Icon from "primitives/Icon";
import Typography from "primitives/Typography";

import { usePrevious, useToggle } from "libs/hooks";
import {
  ai,
  Aligns,
  backgroundColor,
  borderRadius,
  child,
  color,
  disableDecoration,
  fillColor,
  flex,
  fullWidth,
  height,
  hover,
  marginLeft,
  marginRight,
  padding,
  pointer,
  transform,
  transition,
} from "libs/styles";
import { withPerformance } from "libs/CB/changeDetectionStrategy/withPerformance";

import { TypographyLink } from "../../../../primitives/Typography/TypographyLink";

import { SidebarItemInterface } from "./types";
import { useTreeElementIsActive } from "./libs";

const oneLevelPaddingLeft = 32;

const defaultDuration = 200;

interface RecursiveTreeElementInterface {
  level: number;
  item: SidebarItemInterface;
}

const TreeElement = withPerformance(["toggle"])(function ({
  item,
  level,
  active,
  opened,
  toggle,
}: RecursiveTreeElementInterface & { active: boolean; opened: boolean; toggle: () => void }) {
  const resultProps = {
    styles: [
      height(40),
      pointer,
      padding("8px 10px"),
      fullWidth,
      borderRadius(4),
      transition(`all ${defaultDuration}ms`),
      flex,
      ai(Aligns.CENTER),
      child([transition(`all ${defaultDuration}ms`)], ".item-icon, .item-icon use"),
      hover(backgroundColor("gray-blue/04")),
      hover(fillColor("white"), ".item-icon use"),
      hover(color("white"), ".item-text"),
      active && [
        backgroundColor("gray-blue/04"),
        child(fillColor("white"), ".item-icon use"),
        child(color("white"), ".item-text"),
      ],

      disableDecoration,
    ],
    children: (
      <>
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
        <Typography dots styles={transition(`all ${defaultDuration}ms`)} className="item-text" color="gray-blue/09">
          {item.name}
        </Typography>
      </>
    ),
  };

  if (item.subElements) {
    return <Wrapper {...resultProps} onClick={toggle} />;
  }

  return <TypographyLink to={item.to} {...resultProps} />;
});

export const RecursiveTreeElement = React.memo(function ({ item, level }: RecursiveTreeElementInterface) {
  const [opened, toggle] = useToggle(false);
  const previous = usePrevious(opened);
  const [measureRef, bound] = useMeasure();

  const { height } = useSpring({
    config: { duration: defaultDuration },
    from: { height: 0 },
    to: {
      height: opened ? bound.height : 0,
    },
  });

  const nextLevel = level + 1;

  const active = !item.subElements && useTreeElementIsActive(item.to);

  return (
    <>
      <TreeElement active={active} opened={opened} level={level} item={item} toggle={toggle} />
      {item.subElements && (
        <animated.div style={{ height: opened && previous === opened ? "auto" : height, overflow: "hidden" }}>
          <animated.div ref={measureRef}>
            {item.subElements.map((element) => (
              <RecursiveTreeElement key={element.to} level={nextLevel} item={element} />
            ))}
          </animated.div>
        </animated.div>
      )}
    </>
  );
});
