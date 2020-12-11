import React from "react";

import SimpleText from "modules/screen/blocks/SimpleText";

import { insertContext } from "../../../../../../context/insertContext";
import { useAppContext } from "../../../../../../context/hooks/useAppContext";
import ImageWithDefault from "../../../../../../../primitives/ImageWithDefault";
import { ai, Aligns, border, borderRadius, flex } from "../../../../../../../libs/styles";
import Wrapper from "../../../../../../../primitives/Wrapper";
import { TypographyLink } from "../../../../../../../primitives/Typography/TypographyLink";

import { ElementAndTypeMatchPropsInterface } from "./types";

export default ({ options, styles }: ElementAndTypeMatchPropsInterface) => {
  const reference = insertContext(options.reference, useAppContext().context);
  const title = insertContext(options.title, useAppContext().context);
  return (
    <Wrapper styles={[styles, flex, ai(Aligns.CENTER)]}>
      <TypographyLink to={reference.value}>{title.value}</TypographyLink>
    </Wrapper>
  );
};
