import React from "react";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import { ai, Aligns, emptyBoxShadow, flex, focus, horizontalPadding, marginLeft, overflow, width } from "libs/styles";

function ClearInputWrapper({
  children,
  needShow,
  clear,
  size = ButtonSize.MEDIUM,
}: {
  children: JSX.Element;
  needShow: boolean;
  clear: () => void;
  size?: ButtonSize;
}) {
  return (
    <Wrapper styles={[flex, ai(Aligns.CENTER)]}>
      {children}
      <Button
        styles={[
          marginLeft(4),
          needShow ? [width(32)] : [width(0), focus(emptyBoxShadow), horizontalPadding(0)],
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
