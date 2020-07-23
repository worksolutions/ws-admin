import React from "react";
import { observer } from "mobx-react-lite";

import { CardImageConfig } from "primitives/Card/types";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { ViewMetaData } from "../types";
import { useSubviewLoader } from "../FormattedData/libs";

import { CardsViewDataSource } from "./types";
import CardsView from "./CardsView";

import { BlockInterface } from "state/systemState";

export interface CardsViewBlockInterface
  extends BlockInterface<{
    referenceRedirect?: string;
    imageConfig: CardImageConfig;
  }> {
  onUpdateMeta: (data: ViewMetaData) => void;
}

function CardsViewWrapper({ dataSource, options, onUpdateMeta }: CardsViewBlockInterface) {
  const { data, loadingContainer } = useDataSource<CardsViewDataSource>(dataSource!);

  useSubviewLoader(data, loadingContainer, onUpdateMeta);

  if (!data) return null;

  return <CardsView {...data} {...options!} />;
}

export default React.memo(observer(CardsViewWrapper));
