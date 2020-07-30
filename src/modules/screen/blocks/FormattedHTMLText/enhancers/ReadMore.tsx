import React from "react";
import ReactDOM from "react-dom";

import Typography from "primitives/Typography";
import Wrapper from "primitives/Wrapper";
import ImageWithDefault from "primitives/ImageWithDefault";
import { TypographyLink } from "primitives/Typography/TypographyLink";

import {
  ai,
  Aligns,
  borderRadius,
  flex,
  flexShrink,
  marginBottom,
  marginRight,
  maxHeight,
  overflow,
} from "libs/styles";

import { EnhancerInterface } from "./index";

import { BlockInterface } from "state/systemState";

type ReadMoreType = BlockInterface<
  EnhancerInterface<{ heading: string; image: string; imageAspectRatio: number; text: string; reference: string }>
>;

function ReadMore({ options }: ReadMoreType) {
  const container = React.useMemo(() => document.getElementById(options!.id)!, []);

  if (!container || !options) return null;
  const { data } = options;

  return ReactDOM.createPortal(
    <Wrapper>
      <Typography color="gray-blue/05" type="body-semi-bold" styles={marginBottom(8)}>
        {data.heading || "Читайте также"}
      </Typography>
      <Wrapper styles={[flex, ai(Aligns.CENTER), maxHeight(48), overflow("hidden")]}>
        {data.image && (
          <ImageWithDefault
            width={76}
            aspectRatio={data.imageAspectRatio}
            src={data.image}
            outerStyles={[marginRight(12), flexShrink(0)]}
            styles={borderRadius(4)}
          />
        )}
        <TypographyLink to={data.reference}>{data.text}</TypographyLink>
      </Wrapper>
    </Wrapper>,
    container,
  );
}

export default React.memo(ReadMore);
