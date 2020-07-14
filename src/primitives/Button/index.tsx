import React, { Ref } from "react";

import Wrapper from "primitives/Wrapper";

import preventDefault from "libs/preventDefault";

import ButtonWrapper, { BaseButtonWrapperInterface } from "./ButtonWrapper";
import { ButtonType } from "./types";

interface ButtonInterface extends BaseButtonWrapperInterface {
  preventDefault?: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

const Button = React.forwardRef(function (
  { children, onClick, preventDefault: preventDefaultProp, ...buttonWrapperProps }: ButtonInterface,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <ButtonWrapper {...buttonWrapperProps}>
      {(styles, iconLeft, iconRight) => {
        const clickHandler = buttonWrapperProps.loading ? undefined : onClick;
        return (
          <Wrapper
            ref={ref}
            as="button"
            styles={styles}
            onClick={preventDefaultProp ? preventDefault(clickHandler) : clickHandler}
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
