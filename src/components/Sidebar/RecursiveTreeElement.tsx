import React from "react";
import { animated, useSpring } from "react-spring";
import { duration160, duration160Number } from "layout/durations";
import { useMeasure } from "react-use";

import Wrapper from "primitives/Wrapper";
import Icon from "primitives/Icon";
import Typography from "primitives/Typography";
import { TypographyLink } from "primitives/Typography/TypographyLink";

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
  fontWeight,
  fullWidth,
  hover,
  lastChild,
  marginBottom,
  marginLeft,
  marginRight,
  padding,
  pointer,
  transform,
  transition,
} from "libs/styles";
import { withPerformance } from "libs/CB/changeDetectionStrategy/withPerformance";
import { usePrevious, useToggle } from "libs/hooks/common";

import { SidebarItemInterface } from "./index";
import { useTreeElementIsActive } from "./libs";

const oneLevelPaddingLeft = 32;

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
  const hasSubElements = item.subElements?.length !== 0;

  const resultProps = {
    styles: [
      pointer,
      padding("4px 8px"),
      fullWidth,
      borderRadius(6),
      marginBottom(4),
      lastChild(marginBottom(0), "&"),
      transition(`background-color ${duration160}`),
      flex,
      ai(Aligns.CENTER),
      disableDecoration,
      active
        ? [
            backgroundColor("gray-blue/03"),
            child(fillColor("white"), ".item-icon use"),
            child(color("white"), ".item-text"),
          ]
        : [hover(backgroundColor("gray-blue/02"))],
    ],
    children: (
      <>
        {hasSubElements && (
          <Icon
            className="item-icon"
            color="gray-blue/07"
            width={16}
            height={16}
            styles={[marginRight(4), marginLeft(oneLevelPaddingLeft * level), opened && transform("rotateZ(90deg)")]}
            icon="16-triangle-right"
          />
        )}
        {(item.icon || hasSubElements) && (
          <Icon className="item-icon" color="blue/09" styles={[marginRight(8)]} icon={item.icon || "folder-outline"} />
        )}
        <Typography dots styles={transition(`all ${duration160}`)} className="item-text" color="gray-blue/09">
          {item.name}
        </Typography>
      </>
    ),
  };

  if (hasSubElements) {
    return <Wrapper {...resultProps} onClick={toggle} />;
  }

  return <TypographyLink to={item.reference} {...resultProps} styles={[resultProps.styles, fontWeight(100)]} />;
});

export const RecursiveTreeElement = React.memo(function ({ item, level }: RecursiveTreeElementInterface) {
  const [opened, toggle] = useToggle(false);
  const previous = usePrevious(opened);
  const [measureRef, bound] = useMeasure();

  const { height } = useSpring({
    config: { duration: duration160Number },
    from: { height: 0 },
    to: {
      height: opened ? bound.height : 0,
    },
  });

  const nextLevel = level + 1;

  const active = useTreeElementIsActive(item.reference);

  return (
    <>
      <TreeElement active={active} opened={opened} level={level} item={item} toggle={toggle} />
      {item.subElements?.length !== 0 && (
        <animated.div style={{ height: opened && previous === opened ? "auto" : height, overflow: "hidden" }}>
          <animated.div ref={measureRef as any}>
            {item.subElements!.map((element) => (
              <RecursiveTreeElement key={element.reference} level={nextLevel} item={element} />
            ))}
          </animated.div>
        </animated.div>
      )}
    </>
  );
});
