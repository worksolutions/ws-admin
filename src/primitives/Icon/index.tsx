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
};

export type Icons = keyof typeof list;

interface StyledSVGInterface {
  width?: number;
  height?: number;
  styles?: any;
}

interface SVGInterface extends StyledSVGInterface {
  iconName: Icons;
  color?: Colors;
}

const StyledSVG = styled.svg<StyledSVGInterface>`
  display: inline-block;
  min-width: ${(props) => props.width}px;
  min-height: ${(props) => props.height}px;
`;

const SVG = React.forwardRef(function (
  { iconName, width, height, styles, color = "gray-blue/05" }: SVGInterface,
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
