import React from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

import Loading from "components/LoadingContainer/Loading";

import { flexValue, overflow } from "libs/styles";
import { useBoolean, useEffectSkipFirst } from "libs/hooks/common";
import isEqual from "libs/CB/changeDetectionStrategy/performance/isEqual";
import { BaseError } from "libs/BaseError";
import { entriesObjectMap } from "libs/entriesObjectMap";

import { useActions } from "modules/context/actions/useActions";
import BlockRenderer from "modules/screen/BlockRenderer";
import { useDataSource } from "modules/context/dataSource/useDataSource";
import { useAppContext } from "modules/context/hooks/useAppContext";
import { ContextModel, createModelContextPath } from "modules/model";

import DefaultPageWrapper from "../common/DefaultPageWrapper";
import PageHeader, { PageHeaderInterface } from "../common/Header";

import Saver from "./Saver";

import { BlockInterface, ContainSlotsInterface } from "state/globalState";

import { ActionType, AnyAction } from "types/Actions";
import { ModifierInterface } from "types/Modifier";

function DefaultDetailEditPage({
  slots,
  options,
  actions,
  dataSource,
}: ContainSlotsInterface &
  BlockInterface<PageHeaderInterface & { saveOptions: { context: string; modifiers?: ModifierInterface[] } }, "save">) {
  const changeAction: AnyAction = {
    type: ActionType.UPDATE_CONTEXT,
    context: options!.saveOptions.context,
    options: {},
  };

  const resultActions = useActions({ save: actions!.save, change: changeAction }, useAppContext());

  const [touched, enableTouched, disableTouched] = useBoolean(false);

  const { data, initialData, loadingContainer } = useDataSource(dataSource!);

  const dataAreEquals = isEqual(data, initialData);

  useEffectSkipFirst(() => {
    if (dataAreEquals) {
      disableTouched();
      return;
    }
    enableTouched();
  }, [dataAreEquals]);

  if (loadingContainer.loading) return <Loading />;

  function save() {
    resultActions.save.run().catch((error: BaseError) => {
      const mappedErrors = entriesObjectMap(error.getErrors(), ([key, error]) => [
        createModelContextPath(key),
        new ContextModel(false, error),
      ]);
      resultActions.change.run(mappedErrors);
    });
  }

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
                saveDisabled={resultActions.save.loadingContainer.loading || !touched}
                saveLoading={resultActions.save.loadingContainer.loading}
                onDiscard={console.log}
                onSave={console.log}
                onApply={save}
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
