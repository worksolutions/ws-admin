import React, { Ref } from "react";

import Icon, { Icons } from "primitives/Icon";
import Hint from "primitives/Popper/Hint";
import LinkWrapper from "primitives/LinkWrapper";

import {
  ai,
  Aligns,
  backgroundColor,
  borderRadius,
  boxShadow,
  createAlphaColor,
  cursor,
  disableOutline,
  flex,
  height,
  hover,
  jc,
  pointerEvents,
  transition,
  width,
} from "libs/styles";

export interface BaseIconButtonInterface {
  icon: Icons | any;
  selected: boolean;
  href?: string;
  hint?: string;
  iconStyles?: any;
  customElement?: (ref: Ref<HTMLElement>, iconElement: React.ReactNode, resultStyles: any) => JSX.Element;
}

function getStylesForElement(selected: boolean, styles: any) {
  return [
    width(40),
    height(40),
    borderRadius(6),
    flex,
    ai(Aligns.CENTER),
    jc(Aligns.CENTER),
    transition("background-color 0.2s"),
    disableOutline,
    selected
      ? [backgroundColor("blue/05"), cursor("default"), pointerEvents("none")]
      : hover([backgroundColor("gray-blue/01"), boxShadow([0, 0, 1, 0, createAlphaColor("black", 81)])]),
    styles,
  ];
}

export const IconLink = React.memo(function ({
  icon,
  selected,
  href,
  hint,
  styles,
  iconStyles,
  customElement,
}: BaseIconButtonInterface & { styles?: any }) {
  const iconElement = <Icon styles={iconStyles} icon={icon} color={selected ? "white" : "blue/09"} />;
  const resultStyles = getStylesForElement(selected, styles);
  return (
    <Hint text={selected ? null : hint} margin={16}>
      {(initParent) => {
        return href ? (
          <LinkWrapper ref={initParent} to={href} styles={resultStyles}>
            {iconElement}
          </LinkWrapper>
        ) : customElement ? (
          customElement(initParent, iconElement, resultStyles)
        ) : (
          <div />
        );
      }}
    </Hint>
  );
});
