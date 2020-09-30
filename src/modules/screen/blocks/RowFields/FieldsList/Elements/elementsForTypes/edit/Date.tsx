import React from "react";

import BlockRenderer from "modules/screen/BlockRenderer";

import { ElementAndTypeMatchPropsInterface } from "../types";

export default ({ options: { dateOptions, actions }, styles }: ElementAndTypeMatchPropsInterface) => (
  <BlockRenderer type="Actions/Date" styles={styles} actions={actions} options={dateOptions} />
);
