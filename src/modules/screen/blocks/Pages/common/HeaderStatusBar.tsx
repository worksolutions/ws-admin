import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Icon from "primitives/Icon";

import { ai, Aligns, backgroundColor, borderRadius, Colors, flex, marginRight, padding } from "libs/styles";

interface HeaderStatusBarInterface {
  styles?: any;
  title: string;
  badgeColor?: Colors;
}

function HeaderStatusBar({ badgeColor, title, styles }: HeaderStatusBarInterface) {
  return (
    <Wrapper
      styles={[flex, ai(Aligns.CENTER), padding("6px 16px"), backgroundColor("gray-blue/01"), borderRadius(24), styles]}
    >
      {badgeColor && <Icon iconName="badge" width={8} height={8} styles={marginRight(8)} color={badgeColor!} />}
      <Typography>{title}</Typography>
    </Wrapper>
  );
}

export default React.memo(HeaderStatusBar);
