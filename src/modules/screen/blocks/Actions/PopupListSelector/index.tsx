import React from "react";
import { observer } from "mobx-react-lite";

import Button, { ButtonSize, ButtonType } from "primitives/Button";
import { Icons } from "primitives/Icon";
import DroppedList, { DroppedListOpenMode } from "primitives/List/DroppedList";
import Input, { InputSize } from "primitives/Input/Input";

import {
  active,
  backgroundColor,
  borderBottom,
  borderRadius,
  child,
  flexValue,
  focus,
  hover,
  paddingLeft,
  transform,
} from "libs/styles";
import { emptyBoxShadow } from "libs/styles/cleaner";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import { useDataSource } from "../../../../context/dataSource/useDataSource";

import Search from "./Search";

import { BlockInterface } from "state/globalState";

type PopupListSelectorOptionsInterface = {
  buttonOptions: { name: string; icon?: Icons };
  searchInputOptions?: {
    context: string;
    placeholder?: string;
  };
};

function PopupListSelector({
  actions,
  options,
  dataSource,
}: BlockInterface<PopupListSelectorOptionsInterface, "select" | "search">) {
  if (!actions?.select) return null;
  if (!dataSource) return null;
  if (!options) return null;
  if (!options.buttonOptions) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);
  console.log(dataSource);
  const { loadingContainer, data } = useDataSource(dataSource!);

  return (
    <DroppedList
      mode={DroppedListOpenMode.CLICK}
      margin={4}
      items={[
        { title: "по новизне", code: "new" },
        { title: "по дате создания", code: "date" },
      ]}
      topComponent={
        resultActions.search &&
        options.searchInputOptions && (
          <Search
            placeholder={options.searchInputOptions.placeholder}
            context={options.searchInputOptions.context}
            searchAction={resultActions.search}
          />
        )
      }
      onChange={(code) => console.log(code)}
    >
      {(state, parentRef, subChild) => (
        <Button
          ref={parentRef}
          type={ButtonType.SECONDARY}
          size={ButtonSize.MEDIUM}
          iconLeft={options.buttonOptions.icon}
          iconRight="arrow-down"
          styles={[child([transform(state.opened ? "rotateZ(180deg)" : "rotateZ(0deg)")], ".icon-right")]}
          onClick={state.toggle}
        >
          {options.buttonOptions.name}
          {subChild}
        </Button>
      )}
    </DroppedList>
  );
}

export default React.memo(observer(PopupListSelector));
