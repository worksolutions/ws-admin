import React from "react";
import { observer } from "mobx-react-lite";

import Button, { ButtonSize, ButtonType } from "primitives/Button";
import { Icons } from "primitives/Icon";
import DroppedList, { DroppedListOpenMode } from "primitives/List/DroppedList";
import ImageWithDefault from "primitives/ImageWithDefault";

import { child, maxWidth, transform, width } from "libs/styles";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useDataSource } from "modules/context/dataSource/useDataSource";

import { ListItemSize } from "../../../../../primitives/List/ListItem";

import Search from "./Search";

import { BlockInterface } from "state/globalState";

import { PaginationInterface } from "types/Pagination";

type PopupListSelectorOptionsInterface = {
  buttonOptions: { name: string; icon?: Icons };
  searchInputOptions?: {
    context: string;
    placeholder?: string;
  };
};

type PopupListItemInterface = {
  id: number;
  name: string;
  image?: string;
  bottomContent?: string;
};

type PopupListSelectorDataInterface = {
  list: PopupListItemInterface[];
  pagination: PaginationInterface;
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
  const { loadingContainer, data } = useDataSource<PopupListSelectorDataInterface>(dataSource!);
  console.log(appContext.context.screen.article.relatedArticles);
  return (
    <DroppedList
      mode={DroppedListOpenMode.CLICK}
      selectedItemIds={appContext.context.screen.article.relatedArticles.map(({ id }: any) => id)}
      itemSize={ListItemSize.MEDIUM}
      margin={4}
      items={data?.list.map(({ id, image, name, bottomContent }) => ({
        code: id,
        title: name,
        subtitle: bottomContent,
        leftContent: <ImageWithDefault width={52} height={32} src={image} />,
        circledLeftContent: false,
      }))}
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
