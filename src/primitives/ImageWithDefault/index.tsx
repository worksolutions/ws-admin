import React from "react";

import { ai, Aligns, backgroundColor, flex, height, jc, overflow, width } from "libs/styles";

import Icon, { Icons } from "../Icon";
import Wrapper from "../Wrapper";

import { StyledComponentsAS } from "types/StyledComponentsAS";

interface ImageInterface {
  src?: string;
  width: number | string;
  height: number | string;
  styles?: any;
  as?: StyledComponentsAS;
  emptyIcon?: Icons;
}

function Image({ src, height: heightProp, width: widthProp, styles, as, emptyIcon = "no-image" }: ImageInterface) {
  const image = src ? <Icon customIcon={src} width="100%" height="100%" /> : <Icon iconName={emptyIcon} />;

  return (
    <Wrapper
      as={as}
      styles={[
        backgroundColor("gray-blue/01"),
        flex,
        ai(Aligns.CENTER),
        jc(Aligns.CENTER),
        width(widthProp),
        height(heightProp),
        overflow("hidden"),
        styles,
      ]}
    >
      {image}
    </Wrapper>
  );
}

export default React.memo(Image);
