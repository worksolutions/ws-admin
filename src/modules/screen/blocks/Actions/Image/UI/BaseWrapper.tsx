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
  hover,
  jc,
  overflow,
  position,
  transition,
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
        flex,
        flexValue(1),
        ai(Aligns.CENTER),
        jc(Aligns.CENTER),
        overflow("hidden"),
        styles,
      ]}
      onClick={loading ? undefined : openNativeFileDialog}
    >
      {loading ? <LoadingProgress progress={progress} discard={discardUploading} /> : children}
    </Wrapper>
  );
}

export default React.memo(BaseWrapper);
