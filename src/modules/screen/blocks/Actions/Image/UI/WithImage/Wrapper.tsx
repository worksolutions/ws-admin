import React from "react";
import { duration160 } from "layout/durations";
import { elevation8 } from "style/shadows";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import {
  backgroundColor,
  borderRadius,
  createAlphaColor,
  flex,
  flexValue,
  fullHeight,
  fullWidth,
  hover,
  left,
  marginRight,
  opacity,
  padding,
  position,
  top,
  transition,
} from "libs/styles";

interface ImageWrapper {
  openNativeFileDialog: () => void;
  removeFile: () => void;
  buttonsStyles?: any;
  appendUIElement?: React.ReactNode;
  children: React.ReactNode;
}

function ImageWrapper({ children, removeFile, openNativeFileDialog, buttonsStyles, appendUIElement }: ImageWrapper) {
  return (
    <Wrapper styles={[flexValue(1), hover(opacity(1), ">.ui")]}>
      {children}
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
            borderRadius(6),
            backgroundColor("white"),
            elevation8,
            padding(4),
            flex,
            buttonsStyles,
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
        {appendUIElement}
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(ImageWrapper);
