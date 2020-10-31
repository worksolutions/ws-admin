import React from "react";
import { propEq } from "ramda";

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

function renderEmptyAction(_action: any) {
  return null;
}

function renderButtonActions({ actions }: TableActionPropsInterface) {
  return (
    <>
      {actions.map((action, key) => (
        <Button
          key={key}
          styles={[marginLeft(buttonMarginLeft), firstChild(marginLeft(0), "&")]}
          type={ButtonType.ICON}
          size={ButtonSize.SMALL}
          iconLeft={action.loading ? undefined : action.icon}
          loading={action.loading}
          onClick={() => action.handler()}
        />
      ))}
    </>
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

enum ActionsType {
  DEFAULT = "default",
  DROPDOWN = "dropdown",
}

const mapComponentAndActionsType = {
  [ActionsType.DEFAULT]: renderButtonActions,
  [ActionsType.DROPDOWN]: renderDropdownAction,
};

const getComponentByActions = ({ type = ActionsType.DEFAULT, list }: { type: ActionsType; list: any[] }) => {
  if (list.length === 0) return renderEmptyAction;
  return mapComponentAndActionsType[type];
};

export const cellComponent: CellComponentData = ({ item: actions, index }) => {
  const appContext = useAppContext();

  const memoizedActions = React.useMemo(() => {
    const result: Record<string, AnyRawAction> = {};
    actions.list.forEach((action: any, index: number) => {
      result[index.toString()] = action.action;
    });

    return result;
  }, [actions.list]);

  const patchedActions = useActions(memoizedActions, appContext);

  const ComponentByActionsCount: React.FC<TableActionPropsInterface> = getComponentByActions(actions);

  return {
    component: (
      <Wrapper styles={flex}>
        <ComponentByActionsCount
          actions={actions.list.map((action: any, actionIndex: number) => ({
            ...action,
            loading: patchedActions[actionIndex].loadingContainer.loading,
            handler: () => patchedActions[actionIndex].run({ index }),
          }))}
        />
      </Wrapper>
    ),
    cellWidth:
      cellDefaultHorizontalPadding + actions.list.length * buttonWidth + buttonMarginLeft * (actions.list.length - 1),
  };
};
