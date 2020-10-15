import React from "react";

import SimpleText from "modules/screen/blocks/SimpleText";

import { insertContext } from "../../../../../../context/insertContext";
import { useAppContext } from "../../../../../../context/hooks/useAppContext";
import ImageWithDefault from "../../../../../../../primitives/ImageWithDefault";
import { border, borderRadius } from "../../../../../../../libs/styles";

import { ElementAndTypeMatchPropsInterface } from "./types";

export default ({ options, styles }: ElementAndTypeMatchPropsInterface) => {
  const reference = insertContext(options.reference, useAppContext().context);
  return (
    <ImageWithDefault
      styles={[styles, borderRadius(6), border(1, "gray-blue/02")]}
      src={reference.value}
      width="100%"
      aspectRatio={options.aspectRatio}
    />
  );
};
