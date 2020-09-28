import React from "react";
import styled from "styled-components/macro";
import { prop } from "ramda";

import Wrapper from "primitives/Wrapper";

import {
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  Colors,
  display,
  getColor,
  height,
  stringOrPixels,
  width,
} from "libs/styles";
import { isString } from "libs/is";
import { provideRef } from "libs/provideRef";

import { list } from "./list";

export type Icons = keyof typeof list;

interface StyledSVGInterface {
  width?: number | string;
  height?: number | string;
  styles?: any;
}

interface SVGInterface extends StyledSVGInterface {
  icon?: Icons | any;
  className?: string;
  color?: Colors;
}

const StyledSVG = styled.svg<StyledSVGInterface & { fillColor: any }>`
  display: inline-block;
  min-width: ${(props) => stringOrPixels(props.width!)};
  min-height: ${(props) => stringOrPixels(props.height!)};
  use {
    fill: ${prop("fillColor")};
  }
`;

const SVG = React.forwardRef(function (
  { className, icon, width: widthProp, height: heightProp, styles, color = "gray-blue/05" }: SVGInterface,
  refProp: any,
) {
  // @ts-ignore
  const rawIcon = React.useMemo(() => (icon in list ? list[icon] : icon), [icon]);

  const [ref, setRef] = React.useState<HTMLElement | SVGSVGElement | null>();

  React.useEffect(() => {
    if (!ref) return;
    ref.innerHTML = `<use xlink:href="${rawIcon.symbol}" />`;
  }, [ref, rawIcon]);

  if (!rawIcon) return null;

  if (isString(rawIcon)) {
    return (
      <Wrapper
        as="span"
        css={[
          display("inline-block"),
          width(widthProp!),
          height(heightProp!),
          backgroundImage(rawIcon),
          backgroundPosition("center"),
          backgroundSize("cover"),
          styles,
        ]}
        className={className}
        ref={provideRef(refProp, setRef)}
      />
    );
  }

  return (
    <StyledSVG
      // @ts-ignore
      css={styles}
      className={className}
      width={widthProp}
      height={heightProp}
      viewBox={rawIcon.viewBox}
      fillColor={getColor(color)}
      ref={provideRef(refProp, setRef)}
    >
      <use xlinkHref={rawIcon.symbol} />
    </StyledSVG>
  );
});

SVG.defaultProps = {
  width: 24,
  height: 24,
};

export default React.memo(SVG);
