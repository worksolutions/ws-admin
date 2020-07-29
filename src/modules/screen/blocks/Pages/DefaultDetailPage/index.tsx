import React from "react";
import { observer } from "mobx-react-lite";

import Spinner from "primitives/Spinner";

import { flexValue, overflow } from "libs/styles";

import BlockRenderer from "modules/screen/BlockRenderer";
import { useDataSource } from "modules/context/dataSource/useDataSource";

import DefaultPageWrapper from "../common/DefaultPageWrapper";

import PageHeader, { PageHeaderInterface } from "./Header";

import { BlockInterface, ContainSlotsInterface } from "state/systemState";

function DefaultPageWithList({
  slots,
  options,
  dataSource,
}: ContainSlotsInterface & BlockInterface<PageHeaderInterface>) {
  const data = useDataSource(dataSource!);

  if (data.loadingContainer.loading) return <Spinner />;

  return (
    <DefaultPageWrapper
      heading={
        <PageHeader
          slots={slots}
          title={options!.title}
          status={options!.status}
          externalReference={options!.externalReference}
        />
      }
    >
      {slots.mainContent && <BlockRenderer {...slots.mainContent} styles={[flexValue(1), overflow("hidden")]} />}
    </DefaultPageWrapper>
  );
}

export default React.memo(observer(DefaultPageWithList));
