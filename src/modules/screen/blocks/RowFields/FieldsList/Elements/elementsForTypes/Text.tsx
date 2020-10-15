import React from "react";

import SimpleText from "modules/screen/blocks/SimpleText";

import { ElementAndTypeMatchPropsInterface } from "./types";

export default ({ options, styles }: ElementAndTypeMatchPropsInterface) => (
  <SimpleText styles={styles} options={options} />
);
