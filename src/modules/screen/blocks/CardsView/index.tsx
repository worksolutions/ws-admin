import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import Spinner from "primitives/Spinner";
import Typography from "primitives/Typography";
import { CardImageConfig } from "primitives/Card/types";

import { ai, Aligns, flex, flexValue } from "libs/styles";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { CardsViewDataSource } from "./types";
import CardsView from "./CardsView";

import { BlockInterface } from "state/systemState";

export type CardsViewBlockInterface = BlockInterface<{
  clickRedirectToReference?: string;
  imageConfig: CardImageConfig;
}>;

function CardsViewWrapper({ dataSource, options }: CardsViewBlockInterface) {
  const { data, loadingContainer } = useDataSource<CardsViewDataSource>(dataSource!);

  if (loadingContainer.loading) return <Spinner size={36} />;

  return (
    <Wrapper styles={[flex, ai(Aligns.STRETCH), flexValue(1)]}>
      {data ? <CardsView {...data} {...options!} /> : <Typography>Нет данных</Typography>}
    </Wrapper>
  );
}

export default React.memo(observer(CardsViewWrapper));
