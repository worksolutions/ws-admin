import React from "react";

import ImageWithDefault from "primitives/ImageWithDefault";

import { borderRadius, left, top, transform } from "libs/styles";

import ImageWrapper from "./Wrapper";

interface WithImageInterface {
  path: string;
  aspectRatio?: number;
  openNativeFileDialog: () => void;
  removeFile: () => void;
}

function WithSimpleImage({ aspectRatio, path, removeFile, openNativeFileDialog }: WithImageInterface) {
  return (
    <ImageWrapper
      openNativeFileDialog={openNativeFileDialog}
      removeFile={removeFile}
      buttonsStyles={[left("50%"), top("50%"), transform(`translate(-50%, -50%)`)]}
    >
      <ImageWithDefault styles={[borderRadius(5)]} width="100%" aspectRatio={aspectRatio} src={path} />
    </ImageWrapper>
  );
}

export default React.memo(WithSimpleImage);
