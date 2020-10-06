import React from "react";

import Wrapper from "primitives/Wrapper";

import { borderRadius, child, flex, height, width, Aligns, jc, ai, fullWidth } from "libs/styles";

import BlockRenderer from "modules/screen/BlockRenderer";

import { ElementAndTypeMatchPropsInterface } from "../types";

const imageAlign: Record<string, Aligns> = {
  center: Aligns.CENTER,
  right: Aligns.END,
  left: Aligns.START,
};

export default ({
  options: { imageOptions, actions, align = "center" },
  styles,
}: ElementAndTypeMatchPropsInterface) => (
  <Wrapper styles={[fullWidth, flex, ai(Aligns.CENTER), jc(imageAlign[align])]}>
    <Wrapper styles={[width(96), height(96), flex, child(borderRadius("100%"), ".blockWrapper"), styles]}>
      <BlockRenderer
        type="Actions/Image"
        actions={actions}
        options={{ placeholderIcon: "camera-plus", placeholderText: null, mode: "simple", ...imageOptions }}
      />
    </Wrapper>
  </Wrapper>
);
