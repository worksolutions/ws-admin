import React from "react";
import { observer } from "mobx-react-lite";
import { mergeRight } from "ramda";

import { useFileSelector } from "libs/hooks/files/useFileSelector";
import { boxShadow } from "libs/styles";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useStateContextModel } from "modules/model";

import WithImage from "./WithImage";
import WithoutImage from "./WithoutImage";
import BaseWrapper from "./BaseWrapper";

import { BlockInterface } from "state/globalState";

import FileInterface from "types/FileInterface";

export interface ImageOptionsInterface {
  context: string;
  aspectRatio?: number;
}

type ActionImageInterface = BlockInterface<ImageOptionsInterface, "upload"> & {
  styles?: any;
};

function ActionImage({ actions, options, styles }: ActionImageInterface) {
  if (!actions?.upload) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);

  const {
    value,
    model: { disabled, error },
    setValue,
  } = useStateContextModel(options!.context, appContext);

  function uploadFile(file: FileInterface) {
    resultActions.upload.run(file).then(mergeRight(file)).then(setValue);
  }

  function removeFile() {
    setValue(null);
  }

  function discardUploading() {
    resultActions.upload.discard();
  }

  const { dropAreaProps, openNativeFileDialog, dropping } = useFileSelector(uploadFile);

  if (value?.path) {
    return (
      <BaseWrapper
        styles={styles}
        loading={resultActions.upload.loadingContainer.loading}
        discardUploading={discardUploading}
      >
        <WithImage
          path={value.path}
          name={value.name}
          size={value.size}
          aspectRatio={options!.aspectRatio}
          openNativeFileDialog={openNativeFileDialog}
          removeFile={removeFile}
        />
      </BaseWrapper>
    );
  }

  return (
    <BaseWrapper
      styles={[styles, dropping && boxShadow([0, 0, 0, 2, "blue/04"])]}
      loading={resultActions.upload.loadingContainer.loading}
      openNativeFileDialog={openNativeFileDialog}
      discardUploading={discardUploading}
    >
      <WithoutImage aspectRatio={options!.aspectRatio} dropAreaProps={dropAreaProps} />
    </BaseWrapper>
  );
}

export default React.memo(observer(ActionImage));
