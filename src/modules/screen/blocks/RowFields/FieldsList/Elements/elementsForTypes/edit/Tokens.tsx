import React from "react";

import BlockRenderer from "modules/screen/BlockRenderer";

import { ElementAndTypeMatchPropsInterface } from "../types";

export default ({ options: { tokenOptions, actions }, styles }: ElementAndTypeMatchPropsInterface) => (
  <BlockRenderer type="Actions/Tokens" styles={styles} actions={actions} options={tokenOptions} />
);
