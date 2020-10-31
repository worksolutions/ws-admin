import React, { Ref } from "react";

import Wrapper from "primitives/Wrapper";

import preventDefault from "libs/preventDefault";

import ButtonWrapper, { BaseButtonWrapperInterface } from "./ButtonWrapper";
import { ButtonType } from "./types";

interface ButtonInterface extends BaseButtonWrapperInterface {
  tabIndex?: number;
  loadingText?: string;
  className?: string;
  preventDefault?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = React.forwardRef(function (
  {
    children,
    onClick,
    preventDefault: preventDefaultProp,
    className,
    tabIndex,
    ...buttonWrapperProps
  }: ButtonInterface,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <ButtonWrapper {...buttonWrapperProps}>
      {(styles, iconLeft, iconRight) => {
        const loading = buttonWrapperProps.loadingLeft || buttonWrapperProps.loadingRight;
        const clickHandler = loading ? undefined : onClick;
        return (
          <Wrapper
            className={className}
            ref={ref}
            tabIndex={tabIndex}
            as="button"
            styles={styles}
            disabled={buttonWrapperProps.disabled}
            onClick={clickHandler && (preventDefaultProp ? preventDefault(clickHandler) : clickHandler)}
          >
            {iconLeft}
            {loading ? buttonWrapperProps.loadingText || children : children}
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
