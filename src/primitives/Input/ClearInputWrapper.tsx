import React from "react";
import { duration200 } from "layout/durations";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import {
  ai,
  Aligns,
  emptyBoxShadow,
  flex,
  flexValue,
  focus,
  marginLeft,
  overflow,
  transition,
  width,
} from "libs/styles";

function ClearInputWrapper({
  children,
  needShow,
  clear,
  size = ButtonSize.SMALL,
}: {
  children: JSX.Element;
  needShow: boolean;
  clear: () => void;
  size?: ButtonSize;
}) {
  return (
    <Wrapper styles={[flex, ai(Aligns.CENTER), flexValue(1)]}>
      {children}
      <Button
        styles={[
          marginLeft(8),
          transition(`all ${duration200}`),
          needShow ? [width(24)] : [width(0), focus(emptyBoxShadow)],
          overflow("hidden"),
        ]}
        type={ButtonType.ICON}
        size={size}
        iconLeft="cross-small"
        onClick={clear}
      />
    </Wrapper>
  );
}

export default React.memo(ClearInputWrapper);
