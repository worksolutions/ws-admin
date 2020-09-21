import React from "react";

import Spinner from "primitives/Spinner";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import { position, right, top } from "libs/styles";
import stopPropagation from "libs/stopPropagation";

interface LoadingProgressInterface {
  discard: () => void;
}

function LoadingProgress({ discard }: LoadingProgressInterface) {
  return (
    <>
      <Spinner />
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
