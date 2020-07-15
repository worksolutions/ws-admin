import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Icon, { Icons } from "primitives/Icon";
import MenuButton, { MenuButtonOpenMode } from "primitives/MenuButton";

import { ai, Aligns, Colors, flex, flexValue, jc, marginBottom, padding, whiteSpace } from "libs/styles";

import List from "../List";

import { CardActionInterface, CardStatusInterface } from "./types";

interface HeadingInterface {
  title: string;
  statuses: CardStatusInterface[];
  actions: CardActionInterface[];
  onActionClick: (index: number) => Promise<void>;
}

function Heading({ title, actions, statuses, onActionClick }: HeadingInterface) {
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
        <MenuButton openMode={MenuButtonOpenMode.HOVER}>
          {(close) => (
            <List
              styles={padding("4px 8px")}
              titleStyles={whiteSpace("nowrap")}
              items={actions.map((action) => ({
                title: action.name,
                disabled: action.loading,
                leftContent: action.iconName ? <Icon iconName={action.iconName} color={action.iconColor} /> : null,
              }))}
              onClick={async (index) => {
                await onActionClick(index);
                close();
              }}
            />
          )}
        </MenuButton>
      )}
    </Wrapper>
  );
}

export default React.memo(Heading);
