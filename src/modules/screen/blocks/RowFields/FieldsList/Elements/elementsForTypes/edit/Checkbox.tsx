import React from "react";

import BlockRenderer from "modules/screen/BlockRenderer";

import { ElementAndTypeMatchPropsInterface } from "../types";

export default ({ options: { checkboxOptions, actions, modifier }, styles }: ElementAndTypeMatchPropsInterface) => (
  <BlockRenderer type="Actions/Checkbox" styles={styles} actions={actions} options={checkboxOptions} />
);
