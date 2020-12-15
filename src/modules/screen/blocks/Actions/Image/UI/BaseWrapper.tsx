import React from "react";
import { duration160 } from "layout/durations";

import Wrapper from "primitives/Wrapper";

import {
  ai,
  Aligns,
  borderRadius,
  boxShadow,
  flex,
  flexValue,
  height,
  hover,
  jc,
  overflow,
  position,
  transition,
  width,
} from "libs/styles";

import LoadingProgress from "./LoadingProgress";

interface BaseWrapperInterface {
  styles?: any;
  progress: number;
  loading: boolean;
  children: JSX.Element;
  openNativeFileDialog?: () => void;
  discardUploading: () => void;
}

function BaseWrapper({
  styles,
  children,
  progress,
  loading,
  openNativeFileDialog,
  discardUploading,
}: BaseWrapperInterface) {
  return (
    <Wrapper
      className="blockWrapper"
      styles={[
        position("relative"),
        borderRadius(6),
        transition(`box-shadow ${duration160}`),
        boxShadow([0, 0, 0, 1, "gray-blue/02"]),
        hover(boxShadow([0, 0, 0, 1, "gray-blue/03"])),
        overflow("hidden"),
        flexValue(1),
        styles,
      ]}
      onClick={loading ? undefined : openNativeFileDialog}
    >
      {loading ? (
        <Wrapper
          className="blockWrapper"
          styles={[width("100%"), height("100%"), flex, ai(Aligns.CENTER), jc(Aligns.CENTER)]}
          onClick={loading ? undefined : openNativeFileDialog}
        >
          <LoadingProgress progress={progress} discard={discardUploading} />
        </Wrapper>
      ) : (
        children
      )}
    </Wrapper>
  );
}

export default React.memo(BaseWrapper);
