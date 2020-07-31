import React, { Ref } from "react";

import Wrapper from "primitives/Wrapper";

import preventDefault from "libs/preventDefault";

import ButtonWrapper, { BaseButtonWrapperInterface } from "./ButtonWrapper";
import { ButtonType } from "./types";
import { provideRef } from "../../libs/provideRef";

interface ButtonInterface extends BaseButtonWrapperInterface {
  className?: string;
  preventDefault?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = React.forwardRef(function (
  { children, onClick, preventDefault: preventDefaultProp, className, ...buttonWrapperProps }: ButtonInterface,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <ButtonWrapper {...buttonWrapperProps}>
      {(styles, { iconLeft, iconRight }, hintRef) => {
        const clickHandler = buttonWrapperProps.loading ? undefined : onClick;
        return (
          <Wrapper
            className={className}
            ref={provideRef(ref, hintRef!)}
            as="button"
            styles={styles}
            disabled={buttonWrapperProps.disabled}
            onClick={clickHandler && (preventDefaultProp ? preventDefault(clickHandler) : clickHandler)}
          >
            {iconLeft}
            {buttonWrapperProps.loading ? buttonWrapperProps.loadingText || children : children}
            {iconRight}
          </Wrapper>
        );
      }}
    </ButtonWrapper>
  );
});

Button.defaultProps = {
  preventDefault: true,
};

export default React.memo(Button);

export { ButtonType, ButtonSize } from "./types";
