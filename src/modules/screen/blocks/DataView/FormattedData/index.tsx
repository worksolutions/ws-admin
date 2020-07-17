import React from "react";
import { observer } from "mobx-react-lite";
import { useLocalStorage } from "react-use";
import { assoc } from "ramda";
import { toJS } from "mobx";
import { createCipher } from "crypto";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import Pagination from "components/Pagination/Pagination";

import {
  ai,
  Aligns,
  border,
  borderRadius,
  borderTop,
  flex,
  flexColumn,
  flexValue,
  flexWrap,
  jc,
  marginRight,
  padding,
  zIndex,
} from "libs/styles";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useDataSource } from "modules/context/dataSource/useDataSource";

import TableViewBlock from "../Table";
import CardsViewBlock, { CardsViewBlockInterface } from "../Cards";
import BlockRenderer from "../../../BlockRenderer";
import { ViewMetaData } from "../types";

import { BlockInterface, ContainBlocksInterface } from "state/systemState";

import { AnyDataSource, ContainsDataSourceInterface } from "types/DataSource";
import { PaginationInterface } from "types/Pagination";

const initialValue = { mode: "table" };

const initialMetaData: ViewMetaData = {
  pagination: { itemsCount: 0, pagesCount: 0 },
};

function FormattedDataView({
  options,
}: BlockInterface<{
  id: string;
  tableView: ContainsDataSourceInterface<AnyDataSource>;
  cardsView: CardsViewBlockInterface;
  controlPanel: ContainBlocksInterface;
  paginationView: BlockInterface<{ enabled: boolean }, "change">;
}>) {
  const [data, set] = useLocalStorage(options!.id, initialValue);
  const [metaData, setMetaData] = React.useState(initialMetaData);
  const appContext = useAppContext();
  const actions = useActions(options?.paginationView.actions!, appContext);
  const paginationViewData = useDataSource<PaginationInterface>(options!.paginationView.dataSource!);

  return (
    <Wrapper styles={[flex, ai(Aligns.STRETCH), flexValue(1), borderRadius(8), border(1, "gray-blue/02"), flexColumn]}>
      <Wrapper styles={[padding("16px 16px 0 16px"), flex, ai(Aligns.CENTER), flexWrap, zIndex(1)]}>
        {options?.controlPanel.blocks.map((block, key) => (
          <BlockRenderer key={key} styles={marginRight(16)} {...block} />
        ))}
        <Button
          type={ButtonType.ICON}
          size={ButtonSize.MEDIUM}
          iconLeft={data?.mode === "cards" ? "density-high" : "dashboard"}
          onClick={() => set({ mode: data?.mode === "cards" ? "table" : "cards" })}
        />
      </Wrapper>
      {data?.mode === "cards" ? (
        <CardsViewBlock {...options!.cardsView} onUpdateMeta={setMetaData} />
      ) : (
        <TableViewBlock {...options!.tableView} />
      )}
      {options?.paginationView.options?.enabled && paginationViewData.data && actions.change && (
        <Wrapper styles={[flex, jc(Aligns.END), padding(16), borderTop(1, "gray-blue/02")]}>
          <Pagination
            perPage={paginationViewData.data.perPage}
            elementsCount={metaData.pagination.itemsCount}
            onChange={(page) => {
              actions.change.run(assoc("page", page, paginationViewData.data!));
            }}
          />
        </Wrapper>
      )}
    </Wrapper>
  );
}

export default React.memo(observer(FormattedDataView));
