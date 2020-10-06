import React from "react";

import { FieldListItemType } from "../types";

import Text from "./elementsForTypes/Text";
import Image from "./elementsForTypes/Image";
import IconLink from "./elementsForTypes/IconLink";
import Link from "./elementsForTypes/Link";
import EditRadioGroup from "./elementsForTypes/edit/RadioGroup";
import EditDate from "./elementsForTypes/edit/Date";
import EditText from "./elementsForTypes/edit/Text";
import EditPassword from "./elementsForTypes/edit/Password";
import EditDropdown from "./elementsForTypes/edit/Dropdown";
import EditTokens from "./elementsForTypes/edit/Tokens";
import EditImage from "./elementsForTypes/edit/Image";
import EditAvatar from "./elementsForTypes/edit/Avatar";
import EditCheckbox from "./elementsForTypes/edit/Checkbox";
import { ElementAndTypeMatchPropsInterface } from "./elementsForTypes/types";

interface FieldItemElementRendererInterface {
  styles?: any;
  options: Record<string, any>;
  type: FieldListItemType;
}

const matchesFieldItemAndType: Record<FieldListItemType, (props: ElementAndTypeMatchPropsInterface) => JSX.Element> = {
  [FieldListItemType.text]: Text,
  [FieldListItemType.image]: Image,
  [FieldListItemType.iconLink]: IconLink,
  [FieldListItemType.link]: Link,
  "edit:RadioGroup": EditRadioGroup,
  "edit:Date": EditDate,
  "edit:Text": EditText,
  "edit:Password": EditPassword,
  "edit:Dropdown": EditDropdown,
  "edit:Tokens": EditTokens,
  "edit:Image": EditImage,
  "edit:Avatar": EditAvatar,
  "edit:Checkbox": EditCheckbox,
};

function FieldItemElementRenderer({ options, styles, type }: FieldItemElementRendererInterface) {
  if (!type) return null;
  const Component = matchesFieldItemAndType[type];
  return <Component options={options} styles={styles} />;
}

export default React.memo(FieldItemElementRenderer);
