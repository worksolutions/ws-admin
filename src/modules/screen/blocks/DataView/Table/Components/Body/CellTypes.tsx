import React from "react";

import Typography from "primitives/Typography";
import ImageWithDefault from "primitives/ImageWithDefault";
import Icon from "primitives/Icon";
import DroppedList, { DroppedListOpenMode } from "primitives/List/DroppedList";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import Wrapper from "primitives/Wrapper";

import { border, borderRadius, marginRight, verticalPadding } from "libs/styles";

import { TableViewColumn, TableViewDataType, TableViewItemInterface } from "../../types";

type ColumnComponent = (props: {
  item: TableViewItemInterface;
  width: number;
  linkWrapper?: (child: React.ReactNode) => JSX.Element;
  column: TableViewColumn;
}) => JSX.Element;

const StringComponent: ColumnComponent = ({ item: { icon, value }, linkWrapper }) => {
  const iconElement = icon && <Icon iconName={icon.name} color={icon.color} styles={marginRight(8)} />;
  if (linkWrapper)
    return linkWrapper(
      <>
        {iconElement}
        <Typography styles={[verticalPadding(2)]} type="body-semi-bold">
          {value}
        </Typography>
      </>,
    );

  return (
    <>
      {iconElement}
      <Typography styles={[verticalPadding(2)]}>{value}</Typography>
    </>
  );
};

const ActionsComponent: ColumnComponent = ({ item }) => {
  return (
    <DroppedList
      mode={DroppedListOpenMode.HOVER}
      margin={4}
      items={item.value.map((action: any) => ({
        // TODO: make actions like card
        id: action.name,
        title: action.name,
        leftContent: action.iconName ? <Icon iconName={action.iconName} color={action.iconColor} /> : null,
      }))}
      onChange={async () => {
        close();
      }}
    >
      {(state, parentRef, subChild) => (
        <Wrapper>
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
        </Wrapper>
      )}
    </DroppedList>
  );
};

const StatusComponent: ColumnComponent = ({ item: { icon, value } }) => {
  const iconElement = icon && <Icon iconName="badge" width={8} height={8} color={icon.color} styles={marginRight(8)} />;
  return (
    <Typography styles={[verticalPadding(2)]}>
      {iconElement}
      {value}
    </Typography>
  );
};

const ImageComponent: ColumnComponent = ({ item, width, column }) => (
  <ImageWithDefault
    src={item.value as string}
    width="100%"
    height={Math.ceil(width / column.options!.imageConfig!.aspectRatio)}
    styles={[border(1, "gray-blue/02"), borderRadius(4)]}
    emptyIcon="16-no-image"
    emptyIconSize={16}
  />
);

export const ComponentsForColumnType: Record<TableViewDataType, ColumnComponent> = {
  [TableViewDataType.STRING]: StringComponent,
  [TableViewDataType.IMAGE]: ImageComponent,
  [TableViewDataType.DATE]: StringComponent,
  [TableViewDataType.ACTIONS]: ActionsComponent,
  [TableViewDataType["STATUS-STRING"]]: StatusComponent,
};
