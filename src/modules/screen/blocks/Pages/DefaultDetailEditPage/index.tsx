import React from "react";
import { observer } from "mobx-react-lite";

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

function DefaultDetailEditPage({ slots, options, actions, dataSource }: DefaultDetailEditPageInterface) {
  const resultActions = useEditActions(options!.saveOptions.context, actions!);
  const { data, initialData, loadingContainer, updateInitial } = useDataSource(dataSource!);

  const touched = useFormTouched(data, initialData);

  const save = useDetailSaver(resultActions, () => updateInitial(data));
  const checkRequiredFields = useDetailRequiredFieldsChecker(options!.saveOptions.requiredContextFields);

  function saveDetail() {
    const correct = checkRequiredFields();
    if (!correct) return;
    save();
  }

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
            <Saver
              saveDisabled={resultActions.save.loadingContainer.loading || !touched}
              saveLoading={resultActions.save.loadingContainer.loading}
              onDiscard={resultActions.discard?.run}
              onSave={console.log}
              onApply={saveDetail}
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
