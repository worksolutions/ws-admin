import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import Spinner from "primitives/Spinner";
import Typography from "primitives/Typography";

import { ai, Aligns, flex, flexValue } from "libs/styles";

import { useDataSource } from "modules/context/dataSource/useDataSource";
import { useActions } from "modules/context/actions/useActions";
import { useAppContext } from "modules/context/hooks/useAppContext";

import { CardsViewDataSource } from "./types";
import CardsView from "./CardsView";

import { BlockInterface } from "state/systemState";

function CardsViewWrapper({ dataSource, actions }: BlockInterface<{}, "cardClick">) {
  const { data, loadingContainer } = useDataSource<CardsViewDataSource>(dataSource!);
  const appContext = useAppContext();
  const resultActions = useActions(actions!, appContext);

  if (loadingContainer.loading) return <Spinner size={36} />;

  return (
    <Wrapper styles={[flex, ai(Aligns.STRETCH), flexValue(1)]}>
      {data ? <CardsView {...data} onCardClick={resultActions.cardClick.run} /> : <Typography>Нет данных</Typography>}
    </Wrapper>
  );
}

export default React.memo(observer(CardsViewWrapper));
