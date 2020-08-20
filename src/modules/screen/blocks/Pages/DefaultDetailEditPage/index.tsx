import React from "react";
import { observer } from "mobx-react-lite";

import Loading from "components/LoadingContainer/Loading";

import { flexValue, overflow } from "libs/styles";

import { useActions } from "modules/context/actions/useActions";
import BlockRenderer from "modules/screen/BlockRenderer";
import { useDataSource } from "modules/context/dataSource/useDataSource";
import { useAppContext } from "modules/context/hooks/useAppContext";

import DefaultPageWrapper from "../common/DefaultPageWrapper";
import PageHeader, { PageHeaderInterface } from "../common/Header";

import Saver from "./Saver";

import { BlockInterface, ContainSlotsInterface } from "state/globalState";

import { DataSourceType } from "types/DataSource";
import { ModifierInterface } from "types/Modifier";

function DefaultDetailEditPage({
  slots,
  options,
  actions,
}: ContainSlotsInterface &
  BlockInterface<PageHeaderInterface & { saveOptions?: { modifiers?: ModifierInterface[] } }, "save">) {
  const resultActions = useActions(actions!, useAppContext());

  const { data, loadingContainer, initialData } = useDataSource({
    type: DataSourceType.CONTEXT,
    options: { key: "screen:article" },
  });

  if (loadingContainer.loading) return <Loading />;

  return (
    <DefaultPageWrapper
      heading={
        <PageHeader
          slots={slots}
          title={options!.title}
          externalReference={options?.externalReference}
          status={options?.status}
          rightSideElement={
            <>
              <Saver
                saveDisabled={resultActions.save.loadingContainer.loading}
                onDiscard={console.log}
                onSave={console.log}
                onApply={() => resultActions.save.run()}
              />
            </>
          }
        />
      }
    >
      {slots.mainContent && <BlockRenderer {...slots.mainContent} styles={[flexValue(1), overflow("hidden")]} />}
    </DefaultPageWrapper>
  );
}

export default React.memo(observer(DefaultDetailEditPage));
