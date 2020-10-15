import React from "react";

import BlockRenderer from "modules/screen/BlockRenderer";

import { ElementAndTypeMatchPropsInterface } from "../types";

export default ({ options: { inputOptions, actions }, styles }: ElementAndTypeMatchPropsInterface) => (
  <BlockRenderer type="Actions/Password" styles={styles} actions={actions} options={inputOptions} />
);
