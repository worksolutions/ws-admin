import React from "react";
import { observer } from "mobx-react-lite";
import { mergeRight } from "ramda";

import { Icons } from "primitives/Icon";

import { useFileSelector } from "libs/hooks/files/useFileSelector";
import { boxShadow } from "libs/styles";
import { AcceptTypes } from "libs/hooks/files/helpers/inputAccept";
import { RequestError } from "libs/request";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useStateContextModel } from "modules/model";
import globalEventBus from "modules/globalEventBus";

import WithDefaultImage from "./UI/WithImage/WithDefaultImage";
import WithoutImage from "./UI/WithoutImage/WithoutImage";
import BaseWrapper from "./UI/BaseWrapper";
import WithSimpleImage from "./UI/WithImage/WithSimpleImage";

import { BlockInterface } from "state/globalState";

import FileInterface from "types/FileInterface";

export interface ImageOptionsInterface {
  contextPath: string;
  aspectRatio?: number;
  placeholderIcon?: Icons;
  placeholderText?: string;
  mode?: "default" | "simple";
}

type ActionImageInterface = BlockInterface<ImageOptionsInterface, "upload"> & {
  styles?: any;
};

function ActionImage({ actions, options, styles }: ActionImageInterface) {
  if (!actions?.upload) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);

  const { value, setValue } = useStateContextModel(options!.contextPath, appContext);

  function uploadFile(file: FileInterface) {
    resultActions.upload
      .run(file)
      .then(mergeRight(file))
      .then(setValue)
      .catch((err: RequestError) => {
        globalEventBus.emit("ADD_TOAST", { error: true, text: err.getErrorOrMessage() });
      });
  }

  function removeFile() {
    setValue(null);
  }

  function discardUploading() {
    resultActions.upload.discard();
  }

  const { dropAreaProps, openNativeFileDialog, dropping } = useFileSelector(uploadFile, [AcceptTypes.IMAGE]);
  if (value?.path) {
    return (
      <BaseWrapper
        styles={styles}
        loading={resultActions.upload.loadingContainer.loading}
        progress={resultActions.upload.progressContainer.progressValue}
        discardUploading={discardUploading}
      >
        {(options!.mode || "default") === "default" ? (
          <WithDefaultImage
            path={value.path}
            name={value.name}
            size={value.size}
            aspectRatio={options!.aspectRatio}
            openNativeFileDialog={openNativeFileDialog}
            removeFile={removeFile}
          />
        ) : (
          <WithSimpleImage
            path={value.path}
            aspectRatio={options!.aspectRatio}
            openNativeFileDialog={openNativeFileDialog}
            removeFile={removeFile}
          />
        )}
      </BaseWrapper>
    );
  }

  return (
    <BaseWrapper
      styles={[styles, dropping && boxShadow([0, 0, 0, 2, "blue/04"])]}
      loading={resultActions.upload.loadingContainer.loading}
      progress={resultActions.upload.progressContainer.progressValue}
      openNativeFileDialog={openNativeFileDialog}
      discardUploading={discardUploading}
    >
      <WithoutImage
        aspectRatio={options!.aspectRatio}
        dropAreaProps={dropAreaProps}
        placeholderText={options!.placeholderText}
        placeholderIcon={options!.placeholderIcon}
      />
    </BaseWrapper>
  );
}

export default observer(ActionImage);
