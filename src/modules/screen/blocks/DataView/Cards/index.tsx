import React from "react";
import { observer } from "mobx-react-lite";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { CardsViewDataSource, CardsViewInterface } from "./types";
import CardsViewPresenter from "./Presenter/CardsViewPresenter";

function CardsView({ dataSource, options, onLoadingUpdate }: CardsViewInterface) {
  const { data, loadingContainer } = useDataSource<CardsViewDataSource>(dataSource!);

  React.useEffect(() => {
    if (!onLoadingUpdate) return;
    onLoadingUpdate(loadingContainer.loading);
  }, [loadingContainer.loading]);

  if (!data) return null;

  return <CardsViewPresenter list={data} {...options!} />;
}

export default React.memo(observer(CardsView));
