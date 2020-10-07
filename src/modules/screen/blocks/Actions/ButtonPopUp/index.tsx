import React from "react";
import { observer } from "mobx-react-lite";
import { findIndex, has, pick, propEq } from "ramda";

import { Icons } from "primitives/Icon";
import DroppedList, { DroppedListOpenMode } from "primitives/List/DroppedList";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import { ListItemInterface } from "primitives/List/ListItem";

import { color } from "libs/styles";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import { BlockInterface } from "state/globalState";

import { AnyRawAction } from "types/Actions";

function ButtonPopUp({
  options,
  styles,
}: BlockInterface<{
  buttonOptions: { icon: Icons };
  listItems: (ListItemInterface<any> & { action: Record<string, AnyRawAction> })[];
}> & {
  styles?: any;
}) {
  if (!options) return null;
  if (!options.buttonOptions) return null;
  if (!options.listItems || options.listItems.length === 0) return null;

  const listItemsWithAction = options.listItems.filter(has("action"));
  if (listItemsWithAction.length === 0) return null;

  const listItemActions = listItemsWithAction.map(pick(["action"]));
  const actions = Object.fromEntries(listItemActions.map(({ action }, index) => [index, action]));
  const resultActions = useActions<any>(actions, useAppContext());

  const onChange = (code: string | number) => {
    const index = findIndex(propEq("code", code))(listItemsWithAction);
    resultActions[index].run();
  };

  return (
    <DroppedList mode={DroppedListOpenMode.CLICK} margin={7} items={listItemsWithAction} onChange={onChange}>
      {(state, parentRef, subChild) => (
        <Button
          ref={parentRef}
          className="ck ck-button ck-off custom-toolbar-button"
          iconLeft={options?.buttonOptions.icon}
          type={ButtonType.ICON}
          size={ButtonSize.SMALL}
          styles={[color("gray-blue/02")]}
          onClick={state.toggle}
        >
          {subChild}
        </Button>
      )}
    </DroppedList>
  );
}

export default React.memo(observer(ButtonPopUp));
