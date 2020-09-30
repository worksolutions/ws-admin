import React from "react";

import SimpleText from "modules/screen/blocks/SimpleText";

import { insertContext } from "../../../../../../context/insertContext";
import { useAppContext } from "../../../../../../context/hooks/useAppContext";
import ImageWithDefault from "../../../../../../../primitives/ImageWithDefault";
import { ai, Aligns, border, borderRadius, flex, marginRight } from "../../../../../../../libs/styles";
import Wrapper from "../../../../../../../primitives/Wrapper";
import Icon from "../../../../../../../primitives/Icon";
import { TypographyLink } from "../../../../../../../primitives/Typography/TypographyLink";

import { ElementAndTypeMatchPropsInterface } from "./types";

export default ({ options, styles }: ElementAndTypeMatchPropsInterface) => {
  const imageReference = insertContext(options.imageReference, useAppContext().context);
  const reference = insertContext(options.reference, useAppContext().context);
  const title = insertContext(options.title, useAppContext().context);

  return (
    <Wrapper styles={[styles, flex, ai(Aligns.CENTER)]}>
      {imageReference.value && <Icon icon={imageReference.value} styles={[marginRight(8), borderRadius(12)]} />}
      <TypographyLink to={reference.value}>{title.value}</TypographyLink>
    </Wrapper>
  );
};
