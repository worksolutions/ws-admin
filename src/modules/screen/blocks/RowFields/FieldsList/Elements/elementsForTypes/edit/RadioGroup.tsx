import React from "react";

import BlockRenderer from "modules/screen/BlockRenderer";

import { ElementAndTypeMatchPropsInterface } from "../types";

export default ({ options: { actions, dataSource, radioGroupOptions }, styles }: ElementAndTypeMatchPropsInterface) => (
  <BlockRenderer
    type="Actions/RadioGroup"
    styles={styles}
    dataSource={dataSource}
    actions={actions}
    options={radioGroupOptions}
  />
);
