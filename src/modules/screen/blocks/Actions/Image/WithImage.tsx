import React from "react";
import { duration160 } from "layout/durations";
import { elevation8 } from "style/shadows";

import ImageWithDefault from "primitives/ImageWithDefault";
import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import Typography from "primitives/Typography";

import {
  backgroundColor,
  borderRadius,
  bottom,
  child,
  createAlphaColor,
  flex,
  flexValue,
  flexWrap,
  fullHeight,
  fullWidth,
  hover,
  left,
  marginRight,
  opacity,
  padding,
  position,
  right,
  top,
  transition,
} from "libs/styles";
import { isNumber } from "libs/is";
import { nbspString } from "libs/nbsp";
import { convertBytesToHumanReadableFormat } from "libs/hooks/files/helpers/bytesToHumanReadableFormat";

interface WithImageInterface {
  path: string;
  name: string;
  size: number;
  aspectRatio?: number;
  openNativeFileDialog: () => void;
  removeFile: () => void;
}

function WithImage({ aspectRatio, name, path, size, removeFile, openNativeFileDialog }: WithImageInterface) {
  return (
    <Wrapper className="aaa" styles={[flexValue(1), hover(opacity(1), ">.ui")]}>
      <ImageWithDefault styles={[borderRadius(5)]} width="100%" aspectRatio={aspectRatio} src={path} />
      <Wrapper
        className="ui"
        styles={[
          transition(`opacity ${duration160}`),
          opacity(0),
          position("absolute"),
          left(0),
          top(0),
          fullWidth,
          fullHeight,
          backgroundColor(createAlphaColor("white", 234)),
        ]}
      >
        <Wrapper
          styles={[
            position("absolute"),
            top(8),
            right(8),
            borderRadius(6),
            backgroundColor("white"),
            elevation8,
            padding(4),
          ]}
        >
          <Button
            styles={marginRight(4)}
            size={ButtonSize.MEDIUM}
            type={ButtonType.ICON}
            iconLeft="edit"
            onClick={openNativeFileDialog}
          />
          <Button size={ButtonSize.MEDIUM} type={ButtonType.ICON} iconLeft="delete" onClick={removeFile} />
        </Wrapper>
        <Wrapper styles={[position("absolute"), left(16), right(16), bottom(16), flex, flexWrap]}>
          <Typography color="gray-blue/09" dots>
            {name}
          </Typography>
          <Typography color="gray-blue/09">
            {isNumber(size) && `${nbspString}(${convertBytesToHumanReadableFormat(size)})`}
          </Typography>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(WithImage);
