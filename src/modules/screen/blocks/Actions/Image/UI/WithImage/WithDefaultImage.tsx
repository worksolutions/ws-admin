import React from "react";

import ImageWithDefault from "primitives/ImageWithDefault";
import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import { borderRadius, bottom, flex, flexWrap, left, position, right, top } from "libs/styles";
import { convertBytesToHumanReadableFormat } from "libs/hooks/files/helpers/bytesToHumanReadableFormat";
import { nbspString } from "libs/nbsp";
import { isNumber } from "libs/is";

import ImageWrapper from "./Wrapper";

interface WithImageInterface {
  path: string;
  name: string;
  size: number;
  aspectRatio?: number;
  openNativeFileDialog: () => void;
  removeFile: () => void;
}

function WithDefaultImage({ aspectRatio, name, path, size, removeFile, openNativeFileDialog }: WithImageInterface) {
  return (
    <ImageWrapper
      openNativeFileDialog={openNativeFileDialog}
      removeFile={removeFile}
      buttonsStyles={[top(8), right(8)]}
      appendUIElement={
        <Wrapper styles={[position("absolute"), left(16), right(16), bottom(16), flex, flexWrap]}>
          <Typography color="gray-blue/09" dots>
            {name}
          </Typography>
          <Typography color="gray-blue/09">
            {isNumber(size) && `${nbspString}(${convertBytesToHumanReadableFormat(size)})`}
          </Typography>
        </Wrapper>
      }
    >
      <ImageWithDefault styles={[borderRadius(5)]} width="100%" aspectRatio={aspectRatio} src={path} />
    </ImageWrapper>
  );
}

export default React.memo(WithDefaultImage);
