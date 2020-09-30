import React from "react";

import BlockRenderer from "modules/screen/BlockRenderer";

import { ElementAndTypeMatchPropsInterface } from "../types";
import RenderFieldListItemModifier from "../../modifiers";

export default ({ options: { inputOptions, actions, modifier }, styles }: ElementAndTypeMatchPropsInterface) => (
  <>
    <BlockRenderer type="Actions/Input" styles={styles} actions={actions} options={inputOptions} />
    <RenderFieldListItemModifier modifier={modifier} />
  </>
);
