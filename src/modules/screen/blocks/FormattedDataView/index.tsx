import React from "react";
import { observer } from "mobx-react-lite";
import { useLocalStorage } from "react-use";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import { ai, Aligns, border, borderRadius, flex, flexValue, position, right } from "libs/styles";

import TableViewBlock from "../TableView";
import CardsViewBlock from "../CardsView";

import { BlockInterface } from "state/systemState";

import { AnyDataSource, ContainsDataSourceInterface } from "types/DataSource";

const initialValue = { mode: "table" };

function FormattedDataView({
  options,
}: BlockInterface<{
  id: string;
  tableView: ContainsDataSourceInterface<AnyDataSource>;
  cardsView: ContainsDataSourceInterface<AnyDataSource>;
}>) {
  const [data, set] = useLocalStorage(options!.id, initialValue);

  return (
    <Wrapper styles={[flex, ai(Aligns.STRETCH), flexValue(1), borderRadius(8), border(1, "gray-blue/02")]}>
      {data?.mode === "cards" ? <CardsViewBlock {...options!.cardsView} /> : <TableViewBlock {...options!.tableView} />}
      <Wrapper styles={[position("absolute"), right(0)]}>
        <Button
          type={ButtonType.ICON}
          size={ButtonSize.MEDIUM}
          iconLeft={data?.mode === "cards" ? "density-high" : "dashboard"}
          onClick={() => set({ mode: data?.mode === "cards" ? "table" : "cards" })}
        />
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(observer(FormattedDataView));
