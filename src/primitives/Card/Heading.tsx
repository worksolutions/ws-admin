import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Icon from "primitives/Icon";
import Spinner from "primitives/Spinner";

import { ai, Aligns, flex, flexValue, jc, marginBottom, marginLeft } from "libs/styles";

import { ListItemId } from "../List";
import DroppedList, { DroppedListOpenMode } from "../List/DroppedList";
import Button, { ButtonSize, ButtonType } from "../Button";

import { CardActionInterface, CardStatusIconSize, CardStatusInterface } from "./types";
import Hint, { HintType } from "../Popper/Hint";

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
        {statuses.map(({ icon, color, size, hint }, key) => {
          const iconSize = headingIconSizes[size || CardStatusIconSize.LARGE];

          return (
            <Hint key={key} text={hint} type={HintType.white} showDelay={160}>
              {(ref) => (
                <Icon ref={ref} icon={icon} color={color} width={iconSize} height={iconSize} styles={marginLeft(8)} />
              )}
            </Hint>
          );
        })}
      </Wrapper>
      {actions.length !== 0 && (
        <DroppedList
          mode={DroppedListOpenMode.HOVER}
          margin={4}
          items={actions.map((action) => ({
            code: action.name,
            title: action.name,
            disabled: action.loading,
            leftContent: action.loading ? (
              <Spinner />
            ) : action.icon ? (
              <Icon icon={action.icon} color={action.iconColor} />
            ) : undefined,
          }))}
          onChange={async (code) => {
            await onActionClick(code);
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
