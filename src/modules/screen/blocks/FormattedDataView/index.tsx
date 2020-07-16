import React from "react";
import { observer } from "mobx-react-lite";
import { useLocalStorage } from "react-use";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import {
  ai,
  Aligns,
  border,
  borderRadius,
  flex,
  flexColumn,
  flexValue,
  flexWrap,
  marginRight,
  padding,
  zIndex,
} from "libs/styles";

import TableViewBlock from "../TableView";
import CardsViewBlock, { CardsViewBlockInterface } from "../CardsView";
import BlockRenderer from "../../BlockRenderer";

import { BlockInterface, ContainBlocksInterface } from "state/systemState";

import { AnyDataSource, ContainsDataSourceInterface } from "types/DataSource";

const initialValue = { mode: "table" };

function FormattedDataView({
  options,
}: BlockInterface<{
  id: string;
  tableView: ContainsDataSourceInterface<AnyDataSource>;
  cardsView: CardsViewBlockInterface;
  controlPanel: ContainBlocksInterface;
}>) {
  const [data, set] = useLocalStorage(options!.id, initialValue);

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
      {data?.mode === "cards" ? <CardsViewBlock {...options!.cardsView} /> : <TableViewBlock {...options!.tableView} />}
    </Wrapper>
  );
}

export default React.memo(observer(FormattedDataView));
