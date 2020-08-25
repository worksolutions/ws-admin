import React from "react";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import { ai, Aligns, flex, focus, horizontalPadding, marginLeft, overflow, width } from "libs/styles";

import { emptyBoxShadow } from "../../libs/styles/cleaner";

const buttonWidthBySize: Record<ButtonSize, number> = {
  [ButtonSize.LARGE]: 32,
  [ButtonSize.MEDIUM]: 32,
  [ButtonSize.SMALL]: 24,
};

function ClearInputWrapper({
  children,
  needShow,
  clear,
  size = ButtonSize.MEDIUM,
  styles,
}: {
  children: JSX.Element;
  needShow?: boolean;
  clear: () => void;
  size?: ButtonSize;
  styles?: any;
}) {
  return (
    <Wrapper styles={[flex, ai(Aligns.CENTER), styles]}>
      {children}
      <Button
        styles={[
          needShow
            ? [marginLeft(4), width(buttonWidthBySize[size])]
            : [marginLeft(0), width(0), focus(emptyBoxShadow), horizontalPadding(0)],
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
