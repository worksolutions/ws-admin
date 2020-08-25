import React from "react";
import { assoc } from "ramda";

import Icon from "primitives/Icon";
import Dropdown from "primitives/Dropdown/Dropdown";

import { Colors, marginRight } from "libs/styles";

import SuggestInterface from "types/SuggestInterface";

export type DynamicStatusBarItem = { badgeColor?: Colors } & SuggestInterface;

interface StaticStatusBarInterface {
  item?: DynamicStatusBarItem;
  items: DynamicStatusBarItem[];
  styles?: any;
  onChange: (newCode: string) => void;
}

function DynamicStatusBar({ item, items, styles, onChange }: StaticStatusBarInterface) {
  return (
    <Dropdown
      outerStyles={styles}
      items={items.map((item) =>
        assoc(
          "leftContent",
          item.badgeColor && <Icon icon="badge" width={8} height={8} styles={marginRight(8)} color={item.badgeColor} />,
          item,
        ),
      )}
      selectedItemCode={item?.code}
      onChange={onChange}
    />
  );
}

export default React.memo(DynamicStatusBar);
