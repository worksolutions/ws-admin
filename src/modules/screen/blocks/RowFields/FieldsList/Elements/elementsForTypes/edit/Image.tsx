import React from "react";

import BlockRenderer from "modules/screen/BlockRenderer";

import { ElementAndTypeMatchPropsInterface } from "../types";

export default ({ options: { imageOptions, actions }, styles }: ElementAndTypeMatchPropsInterface) => (
  <BlockRenderer type="Actions/Image" styles={styles} actions={actions} options={imageOptions} />
);
