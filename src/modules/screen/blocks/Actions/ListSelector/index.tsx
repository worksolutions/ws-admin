import React from "react";
import { observer } from "mobx-react-lite";
import { propEq } from "ramda";

import Icon from "primitives/Icon";
import ImageWithDefault from "primitives/ImageWithDefault";
import { ListItemSize } from "primitives/List/ListItem";
import Wrapper from "primitives/Wrapper";
import List from "primitives/List";

import Loading from "components/LoadingContainer/Loading";
import LoadingProvider from "components/LoadingContainer/LoadingProvider";

import {
  border,
  borderBottom,
  borderBottomRadius,
  borderTopRadius,
  fullHeight,
  fullWidth,
  height,
  maxHeight,
  maxWidth,
  overflowY,
  padding,
  whiteSpace,
  width,
} from "libs/styles";

import { useStateFromContext } from "modules/context/insertContext";
import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useDataSource } from "modules/context/dataSource/useDataSource";

import Search from "../PopupListSelector/Search";

import { BlockInterface } from "state/globalState";

import { PaginationInterface } from "types/Pagination";

type ListSelectorOptionsInterface = {
  contextPath: string;
  searchInputOptions?: {
    contextPath: string;
    placeholder?: string;
  };
  selectedItem: { contextPath: string };
};

type ListSelectorItemInterface = {
  code: string | number;
  heading?: string;
  title: string;
  image?: string;
};

type ListSelectorDataInterface = {
  list: ListSelectorItemInterface[];
  pagination: PaginationInterface;
};

function ListSelector({
  actions,
  options,
  dataSource,
}: BlockInterface<ListSelectorOptionsInterface, "select" | "search">) {
  if (!actions?.select || !actions?.search) return null;
  if (!dataSource) return null;
  if (!options) return null;
  if (!options.selectedItem) return null;
  if (!options.searchInputOptions) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);
  const [data] = useStateFromContext<ListSelectorDataInterface>(options.contextPath, appContext);
  const [selectedItem] = useStateFromContext(options.selectedItem.contextPath, appContext);
  const { loadingContainer } = useDataSource<ListSelectorDataInterface>(dataSource!);

  return (
    <Wrapper styles={[width(450), height(366), padding("16px 12px 0")]}>
      <Search
        placeholder={options.searchInputOptions.placeholder}
        contextPath={options.searchInputOptions.contextPath}
        searchAction={resultActions.search}
        styles={[
          padding("12px 38px 12px 11px"),
          border(1, "gray-blue/02"),
          borderBottom(0, "transparent"),
          borderTopRadius(6),
        ]}
      />
      <Wrapper styles={[border(1, "gray-blue/02"), padding("8px"), borderBottomRadius(6), height(305)]}>
        <Wrapper styles={[fullWidth, fullHeight, overflowY("auto")]}>
          <LoadingProvider>
            {(ref) => (
              <Wrapper ref={ref}>
                {loadingContainer.loading && <Loading />}
                {data?.list && (
                  <List
                    itemSize={ListItemSize.LARGE}
                    items={data.list.map(({ code, image, heading, title }) => ({
                      code,
                      title,
                      heading,
                      leftContent: <ImageWithDefault width={52} height={32} src={image} />,
                      circledLeftContent: false,
                      rightContent: selectedItem === code ? <Icon icon="check" color="blue/05" /> : undefined,
                    }))}
                    activeItemIds={[selectedItem]}
                    titleDots
                    titleStyles={[whiteSpace("normal"), maxHeight(40), maxWidth(292)]}
                    itemStyles={[padding("10px 8px")]}
                    onClick={(code) => resultActions.select.run(data.list.find(propEq("code", code))?.code)}
                  />
                )}
              </Wrapper>
            )}
          </LoadingProvider>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(observer(ListSelector));
