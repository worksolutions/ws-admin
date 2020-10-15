import React from "react";
import { duration160 } from "layout/durations";
import { DropAreaBond } from "react-use/lib/useDrop";

import Wrapper from "primitives/Wrapper";
import Icon, { Icons } from "primitives/Icon";
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
  fullHeight,
  fullWidth,
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
  placeholderIcon?: Icons;
  placeholderText?: string;
}

function WithoutImage({
  aspectRatio,
  dropAreaProps,
  placeholderIcon = "attachment-big",
  placeholderText = "Прикрепить изображение",
}: WithoutImageInterface) {
  return (
    <Wrapper
      styles={[
        flexValue(1),
        pointer,
        fullWidth,
        fullHeight,
        child(transition(`background-color ${duration160}`), ".ui"),
        hover(backgroundColor("gray-blue/01"), ".ui"),
      ]}
      {...dropAreaProps}
    >
      <AspectRatioWrapper width="100%" aspectRatio={aspectRatio}>
        <Wrapper
          className="ui"
          styles={[flex, ai(Aligns.CENTER), jc(Aligns.CENTER), padding("4px 16px"), borderRadius(6)]}
        >
          <Icon icon={placeholderIcon} color="gray-blue/07" />
          {placeholderText && (
            <Typography noWrap styles={[marginLeft(8), TypographyTypes["body-semi-bold"]]} color="gray-blue/07">
              {placeholderText}
            </Typography>
          )}
        </Wrapper>
      </AspectRatioWrapper>
    </Wrapper>
  );
}

export default React.memo(WithoutImage);
