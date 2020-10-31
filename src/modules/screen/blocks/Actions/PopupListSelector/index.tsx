import React from "react";
import { observer } from "mobx-react-lite";
import { append } from "ramda";

import Button, { ButtonSize, ButtonType } from "primitives/Button";
import { Icons } from "primitives/Icon";
import DroppedList, { DroppedListOpenMode } from "primitives/List/DroppedList";
import ImageWithDefault from "primitives/ImageWithDefault";
import { ListItemSize } from "primitives/List/ListItem";
import Wrapper from "primitives/Wrapper";

import Loading from "components/LoadingContainer/Loading";
import LoadingProvider from "components/LoadingContainer/LoadingProvider";

import { child, maxHeight, overflow, transform } from "libs/styles";

import { useStateFromContext } from "modules/context/insertContext";
import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useDataSource } from "modules/context/dataSource/useDataSource";

import Search from "./Search";

import { BlockInterface } from "state/globalState";

import { PaginationInterface } from "types/Pagination";

type PopupListSelectorOptionsInterface = {
  contextPath: string;
  buttonOptions: { name: string; icon?: Icons };
  searchInputOptions?: {
    contextPath: string;
    placeholder?: string;
  };
  selectedItems: {
    contextPath: string;
  };
};

type PopupListItemInterface = {
  id: string | number;
  heading?: string;
  title: string;
  image?: string;
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
  if (!options.selectedItems?.contextPath) return null;

  const appContext = useAppContext();
  const [{ list }] = useStateFromContext<PopupListSelectorDataInterface>(options.contextPath, appContext);
  const [selectedItems] = useStateFromContext<PopupListItemInterface[]>(options.selectedItems.contextPath, appContext);
  const resultActions = useActions(actions, appContext);
  const { loadingContainer } = useDataSource(dataSource!);

  return (
    <DroppedList
      mode={DroppedListOpenMode.CLICK}
      itemSize={ListItemSize.MEDIUM}
      itemsWrapper={(child) => (
        <LoadingProvider>
          {(ref) => (
            <Wrapper ref={ref} styles={[overflow("scroll"), maxHeight(400)]}>
              {loadingContainer.loading && <Loading />}
              {child}
            </Wrapper>
          )}
        </LoadingProvider>
      )}
      margin={4}
      items={list.map(({ id, image, heading, title }) => ({
        code: id,
        title,
        subTitle: heading,
        leftContent: <ImageWithDefault width={52} height={32} src={image} />,
        circledLeftContent: false,
      }))}
      topComponent={
        resultActions.search &&
        options.searchInputOptions && (
          <Search
            placeholder={options.searchInputOptions.placeholder}
            contextPath={options.searchInputOptions.contextPath}
            searchAction={resultActions.search}
          />
        )
      }
      onChange={(code) =>
        resultActions.select.run(
          append(
            list.find(({ id }) => id === code),
            selectedItems,
          ),
        )
      }
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
