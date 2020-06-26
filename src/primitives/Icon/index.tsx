import React from "react";
import styled from "styled-components/macro";

import { Colors, getColor } from "libs/styles";

const list = {
  "arrow-up": require("./icons/arrow-up.svg"),
  "arrow-down": require("./icons/arrow-down.svg"),
  "arrow-left": require("./icons/arrow-left.svg"),
  "arrow-right": require("./icons/arrow-right.svg"),
  "cancel-big": require("./icons/cancel-big.svg"),
  "cancel-small": require("./icons/cancel-small.svg"),
  "account-multiple-outline": require("./icons/account-multiple-outline.svg"),
  "bullseye-arrow": require("./icons/bullseye-arrow.svg"),
  cart: require("./icons/cart.svg"),
  "grid-plus-outline": require("./icons/grid-plus-outline.svg"),
  "star-outline": require("./icons/star-outline.svg"),
  website: require("./icons/website.svg"),
  "16-triangle-right": require("./icons/16-triangle-right.svg"),
  "16-small-circle": require("./icons/16-small-circle.svg"),
  "folder-outline": require("./icons/folder-outline.svg"),
  "search-big": require("./icons/search-big.svg"),
  alert: require("./icons/alert.svg"),
  check: require("./icons/check.svg"),
  "eye-on": require("./icons/eye-on.svg"),
  "eye-off": require("./icons/eye-off.svg"),
};

export type Icons = keyof typeof list;

interface StyledSVGInterface {
  width?: number;
  height?: number;
  styles?: any;
}

interface SVGInterface extends StyledSVGInterface {
  iconName: Icons;
  className?: string;
  color?: Colors;
}

const StyledSVG = styled.svg<StyledSVGInterface>`
  display: inline-block;
  min-width: ${(props) => props.width}px;
  min-height: ${(props) => props.height}px;
`;

const SVG = React.forwardRef(function (
  { className, iconName, width, height, styles, color = "gray-blue/05" }: SVGInterface,
  refProp: any,
) {
  if (!iconName) return null;
  const { symbol, viewBox } = list[iconName];
  const [ref, setRef] = React.useState<SVGSVGElement | null>();

  const fillColor = getColor(color);

  React.useEffect(() => {
    if (!ref) return;
    ref.innerHTML = `<use xlink:href="${symbol}" fill="${fillColor}"/>`;
  }, [ref, iconName, color, symbol, fillColor]);

  return (
    <StyledSVG
      // @ts-ignore
      css={styles}
      className={className}
      width={width}
      height={height}
      viewBox={viewBox}
      ref={(ref) => {
        if (refProp) refProp(ref);
        setRef(ref);
      }}
    >
      <use xlinkHref={symbol} fill={fillColor} />
    </StyledSVG>
  );
});

SVG.defaultProps = {
  width: 24,
  height: 24,
};

export default React.memo(SVG);
