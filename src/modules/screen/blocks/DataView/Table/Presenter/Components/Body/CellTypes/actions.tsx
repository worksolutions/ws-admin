import React from "react";
import { cond, equals, always, T, propEq } from "ramda";

import Icon, { Icons } from "primitives/Icon";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import DroppedList, { DroppedListOpenMode } from "primitives/List/DroppedList";
import Wrapper from "primitives/Wrapper";
import Spinner from "primitives/Spinner";

import { Colors, firstChild, flex, marginLeft } from "libs/styles";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import { CellComponentData } from "../types";
import { cellDefaultHorizontalPadding } from "../../../libs/paddings";

import { AnyRawAction } from "types/Actions";

const buttonMarginLeft = 12;
const buttonWidth = 24;

interface TableActionPropsInterface {
  actions: { name: string; icon?: Icons; iconColor?: Colors; loading?: boolean; handler: () => Promise<void> }[];
}

function renderEmptyAction(action: any) {
  return null;
}

function renderButtonAction({ actions }: TableActionPropsInterface) {
  const [action] = actions;
  return (
    <Button
      styles={[marginLeft(buttonMarginLeft), firstChild(marginLeft(0), "&")]}
      type={ButtonType.ICON}
      size={ButtonSize.SMALL}
      iconLeft={action.icon}
      onClick={() => console.log("click")}
    />
  );
}

function renderDropdownAction({ actions }: TableActionPropsInterface) {
  return (
    <DroppedList
      mode={DroppedListOpenMode.HOVER}
      margin={4}
      items={actions.map((action) => ({
        title: action.name,
        code: action.name,
        leftContent: action.loading ? (
          <Spinner />
        ) : action.icon ? (
          <Icon icon={action.icon} color={action.iconColor} />
        ) : undefined,
      }))}
      onChange={(id) => actions.find(propEq("name", id))!.handler()}
    >
      {(state, parentRef, subChild) => (
        <Button
          styles={[marginLeft(buttonMarginLeft), firstChild(marginLeft(0), "&")]}
          ref={parentRef}
          type={ButtonType.ICON}
          size={ButtonSize.SMALL}
          iconLeft="kebab-horizontal"
          onClick={state.toggle}
        >
          {subChild}
        </Button>
      )}
    </DroppedList>
  );
}

const getComponentByActionsCount = cond([
  [equals(0), always(renderEmptyAction)],
  [equals(1), always(renderButtonAction)],
  [T, always(renderDropdownAction)],
]);

export const cellComponent: CellComponentData = ({ item, index }) => {
  const appContext = useAppContext();

  const memoizedActions = React.useMemo(() => {
    const result: Record<string, AnyRawAction> = {};
    item.forEach((action: any, index: number) => {
      result[index.toString()] = action.action;
    });
    return result;
  }, [item]);

  const patchedActions = useActions(memoizedActions, appContext);

  const ComponentByActionsCount: React.FC<TableActionPropsInterface> = getComponentByActionsCount(item.length);

  return {
    component: (
      <Wrapper styles={flex}>
        <ComponentByActionsCount
          actions={item.map((action: any, actionIndex: number) => ({
            ...action,
            loading: patchedActions[actionIndex].loadingContainer.loading,
            handler: () => patchedActions[actionIndex].run({ index }),
          }))}
        />
      </Wrapper>
    ),
    cellWidth: cellDefaultHorizontalPadding + item.length * buttonWidth + buttonMarginLeft * (item.length - 1),
  };
};
