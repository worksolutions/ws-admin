import React from "react";

import Button, { ButtonSize, ButtonType } from "primitives/Button";
import ProgressBar from "primitives/ProgressBar";

import { marginLeft, marginRight, position, right, top } from "libs/styles";
import stopPropagation from "libs/stopPropagation";

interface LoadingProgressInterface {
  progress: number;
  discard: () => void;
}

function LoadingProgress({ progress, discard }: LoadingProgressInterface) {
  return (
    <>
      <ProgressBar value={progress} styles={[marginLeft(24), marginRight(24)]} />
      <Button
        iconLeft="cross-small"
        size={ButtonSize.MEDIUM}
        type={ButtonType.ICON}
        styles={[position("absolute"), top(8), right(8)]}
        onClick={stopPropagation(discard)}
      />
    </>
  );
}

export default React.memo(LoadingProgress);
