import React from "react";
import { duration160 } from "layout/durations";
import { DropAreaBond } from "react-use/lib/useDrop";

import Wrapper from "primitives/Wrapper";
import Icon from "primitives/Icon";
import Typography, { TypographyTypes } from "primitives/Typography";
import AspectRatioWrapper from "primitives/AspectRatioWrapper";

import {
  ai,
  Aligns,
  backgroundColor,
  borderRadius,
  child,
  flex,
  flexValue,
  hover,
  jc,
  marginLeft,
  padding,
  pointer,
  transition,
} from "libs/styles";

interface WithoutImageInterface {
  aspectRatio?: number;
  dropAreaProps: DropAreaBond;
}

function WithoutImage({ aspectRatio, dropAreaProps }: WithoutImageInterface) {
  return (
    <Wrapper
      styles={[
        flexValue(1),
        pointer,
        child(transition(`background-color ${duration160}`), ".ui"),
        hover(backgroundColor("gray-blue/01"), ".ui"),
      ]}
      {...dropAreaProps}
    >
      <AspectRatioWrapper width="100%" aspectRatio={aspectRatio}>
        <Wrapper
          className="ui"
          styles={[flex, ai(Aligns.CENTER), jc(Aligns.CENTER), padding("4px 16px 4px 12px"), borderRadius(6)]}
        >
          <Icon icon="attachment-big" color="gray-blue/07" />
          <Typography noWrap styles={[marginLeft(8), TypographyTypes["body-semi-bold"]]} color="gray-blue/07">
            Прикрепить изображение
          </Typography>
        </Wrapper>
      </AspectRatioWrapper>
    </Wrapper>
  );
}

export default React.memo(WithoutImage);
