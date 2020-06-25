import React from "react";

import Icon, { Icons } from "primitives/Icon";
import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import { TypographyLink } from "primitives/Typography/TypographyLink";

import { ai, Aligns, disableDecoration, flex, marginRight, padding } from "libs/styles";

interface BreadcrumbElementInterface {
  name: string;
  icon?: Icons;
  hasNext: boolean;
  to: string;
}

export default React.memo(function ({ name, icon, hasNext, to }: BreadcrumbElementInterface) {
  return (
    <Wrapper styles={[flex, ai(Aligns.CENTER)]}>
      {icon && <Icon iconName={icon} color="blue/09" />}
      <TypographyLink to={to} type="caption-regular" color="gray-blue/07" styles={[padding(4), disableDecoration]}>
        {name}
      </TypographyLink>
      {hasNext && (
        <Typography type="caption-regular" color="gray-blue/07" styles={[padding("4px 8px"), marginRight(2)]}>
          /
        </Typography>
      )}
    </Wrapper>
  );
});
