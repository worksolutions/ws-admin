import React from "react";
import { useMeasure } from "react-use";
import { duration200 } from "layout/durations";
import { propEq } from "ramda";

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
  child,
  flex,
  flexColumn,
  flexValue,
  fullWidth,
  height,
  hover,
  jc,
  maxHeight,
  opacity,
  overflow,
  padding,
  transition,
} from "libs/styles";

import { CardImageConfig, CardInterface } from "./types";
import Heading from "./Heading";

interface CardComponentInterface extends CardInterface {
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
        overflow("hidden"),
        borderRadius("0 0 8px 8px"),
      ]}
    >
      {image}
    </Wrapper>
  );
}

function Card(card: CardComponentInterface & Record<string, any>) {
  const { heading, statuses, actions, title, imageConfig, image, ...other } = card;
  const hasTopRow = heading || statuses?.length !== 0 || actions?.length !== 0;

  const [measureRef, bounds] = useMeasure();

  return (
    <Wrapper
      ref={measureRef}
      className="card"
      {...other}
      styles={[
        border(1, "gray-blue/02"),
        borderRadius(8),
        flex,
        flexColumn,
        hover(child([opacity(1)], ".card-actions")),
        child([transition(duration200), opacity(0)], ".card-actions"),
        other.styles,
      ]}
    >
      <Wrapper styles={[padding("12px 16px 16px 16px"), flexValue(1)]}>
        {hasTopRow && (
          <Heading
            actions={actions || []}
            statuses={statuses || []}
            title={heading!}
            onActionClick={(id) => actions!.find(propEq("name", id))!.handler()}
          />
        )}
        {title && (
          <Typography
            className="card-title"
            type="h3-bold"
            color="gray-blue/09"
            styles={[fullWidth, maxHeight(100), overflow("hidden")]}
          >
            {title}
          </Typography>
        )}
      </Wrapper>
      <Image width={bounds.width} height={bounds.width / imageConfig.aspectRatio} src={image} />
    </Wrapper>
  );
}

export default React.memo(Card);
