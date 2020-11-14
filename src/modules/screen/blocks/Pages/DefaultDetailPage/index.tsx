import React from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

import Loading from "components/LoadingContainer/Loading";

import BlockRenderer from "modules/screen/BlockRenderer";
import { useDataSource } from "modules/context/dataSource/useDataSource";

import DefaultPageWrapper from "../common/DefaultPageWrapper";
import PageHeader, { PageHeaderInterface } from "../common/Header";
import { defaultContentStyles } from "../common/styles";
import { CommonPageInterface } from "../common/types";

import { BlockInterface } from "state/globalState";

function DefaultDetailPage({
  slots,
  options,
  dataSource,
  modals,
}: CommonPageInterface & BlockInterface<PageHeaderInterface>) {
  if (dataSource) {
    const data = useDataSource(dataSource, {});
    if (data.loadingContainer.loading) return <Loading />;
    if (data.loadingContainer.hasAnyError()) return null;
  }

  return (
    <DefaultPageWrapper
      modals={modals}
      heading={
        <PageHeader
          slots={slots}
          title={options!.title}
          externalReference={options?.externalReference}
          status={options?.status}
        />
      }
    >
      {slots.mainContent && <BlockRenderer {...slots.mainContent} styles={defaultContentStyles} />}
    </DefaultPageWrapper>
  );
}

export default React.memo(observer(DefaultDetailPage));
