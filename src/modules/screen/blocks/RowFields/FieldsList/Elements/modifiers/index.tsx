import React from "react";

import { FieldListItemModifierInterface, FieldListItemModifierType } from "../../types";

import Toggle from "./Toggle";

const matchFieldListItemModifierTypeAndComponent: Record<
  FieldListItemModifierType,
  (props: FieldListItemModifierInterface) => any
> = { [FieldListItemModifierType.TOGGLE]: Toggle };

function RenderFieldListItemModifier({ modifier }: { modifier?: FieldListItemModifierInterface }) {
  if (!modifier) return null;
  const Component = matchFieldListItemModifierTypeAndComponent[modifier.type];
  return <Component {...modifier} />;
}

export default React.memo(RenderFieldListItemModifier);
