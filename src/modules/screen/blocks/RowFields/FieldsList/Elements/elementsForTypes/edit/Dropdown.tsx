import React from "react";

import BlockRenderer from "modules/screen/BlockRenderer";

import { ElementAndTypeMatchPropsInterface } from "../types";

export default ({ options: { dropdownOptions, dataSource, actions }, styles }: ElementAndTypeMatchPropsInterface) => (
  <BlockRenderer
    type="Actions/Dropdown"
    styles={styles}
    actions={actions}
    options={dropdownOptions}
    dataSource={dataSource}
  />
);
