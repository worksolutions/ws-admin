import React from "react";
import { useMeasure } from "react-use";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Icon from "primitives/Icon";

import {
  ai,
  Aligns,
  backgroundColor,
  border,
  borderRadius,
  borderTop,
  flex,
  flexColumn,
  flexValue,
  fullWidth,
  height,
  jc,
  overflow,
  padding,
} from "libs/styles";

import { CardImageConfig, CardInterface } from "./types";
import Heading from "./Heading";

interface CardComponentInterface extends CardInterface {
  outerStyles?: any;
  link?: string;
  imageConfig: CardImageConfig;
}

function Image({ src, height: heightProp, width: widthProp }: { src?: string; width: number; height: number }) {
  const image = src ? <Icon customIcon={src} width={widthProp} height={heightProp} /> : <Icon iconName="no-image" />;

  if (!image) return null;

  return (
    <Wrapper
      styles={[
        backgroundColor("gray-blue/01"),
        borderTop(1, "gray-blue/02"),
        fullWidth,
        flex,
        ai(Aligns.CENTER),
        jc(Aligns.CENTER),
        height(heightProp),
      ]}
    >
      {image}
    </Wrapper>
  );
}

function Card({ heading, statuses, actions, title, imageConfig, image }: CardComponentInterface) {
  const hasTopRow = heading || statuses?.length !== 0 || actions?.length !== 0;

  const [measureRef, bounds] = useMeasure();

  return (
    <Wrapper
      ref={measureRef}
      className="card"
      styles={[border(1, "gray-blue/02"), borderRadius(8), overflow("hidden"), flex, flexColumn]}
    >
      <Wrapper styles={[padding("12px 16px 16px 16px"), flexValue(1)]}>
        {hasTopRow && <Heading actions={actions || []} statuses={statuses || []} title={heading!} />}
        {title && (
          <Typography type="h3-bold" color="gray-blue/07">
            {title}
          </Typography>
        )}
      </Wrapper>
      <Image width={bounds.width} height={bounds.width / imageConfig.aspectRatio} src={image} />
    </Wrapper>
  );
}

export default React.memo(Card);
