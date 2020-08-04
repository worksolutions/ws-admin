import React from "react";
import { observer } from "mobx-react-lite";

import { CardImageConfig } from "primitives/Card/types";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { ViewMetaData } from "../../types";
import { CardsViewDataSource } from "../../Cards/types";
import { useFormattedDataLoader } from "../libs";
import CardsViewPresenter from "../../Cards/Presenter/CardsViewPresenter";

import { BlockInterface } from "state/globalState";

import { PaginationMeta } from "types/Pagination";

type CardsViewBlockInterface = BlockInterface<{ imageConfig: CardImageConfig }> & {
  onUpdateMeta: (data: ViewMetaData) => void;
};

interface CardsViewBlockDataSource {
  list: CardsViewDataSource;
  pagination: PaginationMeta;
}

function CardsViewBlock({ dataSource, options, onUpdateMeta }: CardsViewBlockInterface) {
  const { data, loadingContainer } = useDataSource<CardsViewBlockDataSource>(dataSource!);

  useFormattedDataLoader(data, loadingContainer, onUpdateMeta);

  if (!data) return null;

  return <CardsViewPresenter {...data} {...options!} />;
}

export default React.memo(observer(CardsViewBlock));
