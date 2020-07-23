import React from "react";
import { observer } from "mobx-react-lite";

import Spinner from "primitives/Spinner";
import Typography from "primitives/Typography";
import { CardImageConfig } from "primitives/Card/types";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { ViewMetaData } from "../types";

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

  React.useEffect(() => {
    if (!data) return;
    if (onUpdateMeta) onUpdateMeta({ pagination: data.pagination });
  }, [data]);

  if (loadingContainer.loading) return <Spinner size={36} />;

  if (!data) return <Typography>Нет данных</Typography>;

  return <CardsView {...data} {...options!} />;
}

export default React.memo(observer(CardsViewWrapper));
