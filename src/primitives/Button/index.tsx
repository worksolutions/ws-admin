import React from "react";

import Wrapper from "primitives/Wrapper";

import Spinner from "../Spinner";

import ButtonWrapper, { BaseButtonWrapperInterface } from "./ButtonWrapper";
import { ButtonType } from "./types";

interface ButtonInterface extends BaseButtonWrapperInterface {
  children?: React.ReactNode;
  onClick: () => void;
}

function Button({ children, onClick, ...buttonWrapperProps }: ButtonInterface) {
  const isIconButton = buttonWrapperProps.type === ButtonType.ICON;
  return (
    <ButtonWrapper {...buttonWrapperProps}>
      {(styles, iconLeft, iconRight) => (
        <Wrapper as="button" styles={styles} onClick={buttonWrapperProps.loading ? undefined : onClick}>
          {iconLeft}
          {!isIconButton && (buttonWrapperProps.loading ? buttonWrapperProps.loadingText || children : children)}
          {iconRight}
        </Wrapper>
      )}
    </ButtonWrapper>
  );
}

export default React.memo(Button);

export { ButtonType, ButtonSize } from "./types";
