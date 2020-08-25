import React from "react";
import { assoc } from "ramda";

import Icon from "primitives/Icon";
import Dropdown from "primitives/Dropdown/Dropdown";

import { ai, Aligns, Colors, flex, height, jc, width } from "libs/styles";

import Wrapper from "../../../../../../../primitives/Wrapper";

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
          item.badgeColor ? (
            <Wrapper styles={[width(24), height(24), flex, ai(Aligns.CENTER), jc(Aligns.CENTER)]}>
              <Icon icon="badge" width={8} height={8} color={item.badgeColor} />
            </Wrapper>
          ) : undefined,
          item,
        ),
      )}
      selectedItemCode={item?.code}
      onChange={onChange}
    />
  );
}

export default React.memo(DynamicStatusBar);
