import React from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

import Loading from "components/LoadingContainer/Loading";

import BlockRenderer from "modules/screen/BlockRenderer";
import { useDataSource } from "modules/context/dataSource/useDataSource";

import DefaultPageWrapper from "../common/DefaultPageWrapper";
import PageHeader from "../common/Header";
import { defaultContentStyles } from "../common/styles";

import Saver from "./Saver";
import { DefaultDetailEditPageInterface } from "./types";
import { useEditActions } from "./hooks/useEditActions";
import { useFormTouched } from "./hooks/useFormTouched";
import { useDetailSaver } from "./hooks/useDetailSaver";
import { useDetailRequiredFieldsChecker } from "./hooks/useDetailRequiredFieldsChecker";

function DefaultDetailEditPage({ slots, options, actions, dataSource, modals }: DefaultDetailEditPageInterface) {
  const resultActions = useEditActions(options!.saveOptions.context, actions!);
  const { data, initialData, loadingContainer, updateInitial } = useDataSource(dataSource!);
  const touched = useFormTouched(data, initialData);
  const {
    saveCompleteOpened,
    saveCompleteShowed,
    save,
    apply,
    saveLoading,
    applyLoading,
  } = useDetailSaver(resultActions, () => updateInitial(data));
  const checkRequiredFields = useDetailRequiredFieldsChecker(options!.saveOptions.requiredContextFields);

  function applyDetail() {
    const correct = checkRequiredFields();
    if (!correct) return;
    apply();
  }

  function saveDetail() {
    const correct = checkRequiredFields();
    console.log(correct);
    if (!correct) return;
    save();
  }

  if (loadingContainer.loading) return <Loading />;

  return (
    <DefaultPageWrapper
      modals={modals}
      heading={
        <PageHeader
          slots={slots}
          title={options!.title}
          externalReference={options?.externalReference}
          status={options?.status}
          rightSideElement={
            <Saver
              saveCompleteOpened={saveCompleteOpened}
              saveCompleteShowed={saveCompleteShowed}
              applyLoading={applyLoading}
              saveLoading={saveLoading}
              saveDisabled={saveLoading || applyLoading || !touched}
              onDiscard={resultActions.close!.run}
              onApply={applyDetail}
              onSave={saveDetail}
            />
          }
        />
      }
    >
      {slots.mainContent && <BlockRenderer {...slots.mainContent} styles={defaultContentStyles} />}
    </DefaultPageWrapper>
  );
}

export default React.memo(observer(DefaultDetailEditPage));
