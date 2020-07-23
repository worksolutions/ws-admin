import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Icon from "primitives/Icon";

import { ai, Aligns, flex, flexValue, jc, marginBottom, marginLeft } from "libs/styles";

import { ListItemId } from "../List";
import DroppedList, { DroppedListOpenMode } from "../List/DroppedList";
import Button, { ButtonSize, ButtonType } from "../Button";

import { CardActionInterface, CardStatusIconSize, CardStatusInterface } from "./types";

interface HeadingInterface {
  title: string;
  statuses: CardStatusInterface[];
  actions: CardActionInterface[];
  onActionClick: (id: ListItemId) => Promise<void>;
}

const headingIconSizes: Record<CardStatusIconSize, number> = {
  [CardStatusIconSize.SMALL]: 8,
  [CardStatusIconSize.MEDIUM]: 16,
  [CardStatusIconSize.LARGE]: 24,
};

function Heading({ title, actions, statuses, onActionClick }: HeadingInterface) {
  return (
    <Wrapper styles={[flex, flexValue(1), ai(Aligns.CENTER), jc(Aligns.SPACE_BETWEEN), marginBottom(4)]}>
      <Wrapper styles={[flex, flexValue(1), ai(Aligns.CENTER)]}>
        {title && (
          <Typography type="caption-regular" color="gray-blue/05">
            {title}
          </Typography>
        )}
        {statuses.map(({ iconName, color, size }, key) => {
          const iconSize = headingIconSizes[size || CardStatusIconSize.LARGE];
          return (
            <Icon
              key={key}
              iconName={iconName}
              color={color}
              width={iconSize}
              height={iconSize}
              styles={marginLeft(8)}
            />
          );
        })}
      </Wrapper>
      {actions.length !== 0 && (
        <DroppedList
          mode={DroppedListOpenMode.HOVER}
          margin={4}
          items={actions.map((action) => ({
            id: action.name,
            title: action.name,
            disabled: action.loading,
            leftContent: action.iconName ? <Icon iconName={action.iconName} color={action.iconColor} /> : null,
          }))}
          onChange={async (id) => {
            await onActionClick(id);
            close();
          }}
        >
          {(state, parentRef, subChild) => (
            <Button
              ref={parentRef}
              className="card-actions"
              type={ButtonType.ICON}
              size={ButtonSize.SMALL}
              iconLeft="kebab-horizontal"
              onClick={state.toggle}
            >
              {subChild}
            </Button>
          )}
        </DroppedList>
      )}
    </Wrapper>
  );
}

export default React.memo(Heading);
