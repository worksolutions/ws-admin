import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Icon, { Icons } from "primitives/Icon";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import { ai, Aligns, Colors, flex, flexValue, jc, marginBottom } from "libs/styles";

import { CardActionInterface, CardStatusInterface } from "./types";

function Heading({
  title,
  actions,
  statuses,
}: {
  title: string;
  statuses: CardStatusInterface[];
  actions: CardActionInterface[];
}) {
  return (
    <Wrapper styles={[flex, flexValue(1), ai(Aligns.CENTER), jc(Aligns.SPACE_BETWEEN), marginBottom(4)]}>
      <Wrapper styles={[flex, flexValue(1), ai(Aligns.CENTER)]}>
        {title && (
          <Typography type="caption-regular" color="gray-blue/05">
            {title}
          </Typography>
        )}
        {statuses.map(({ iconName, color }, key) => (
          <Icon key={key} iconName={iconName as Icons} color={color as Colors} />
        ))}
      </Wrapper>
      {actions.length !== 0 && (
        <>
          <Button iconLeft="kebab-horizontal" type={ButtonType.ICON} size={ButtonSize.SMALL} onClick={console.log} />
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(Heading);
