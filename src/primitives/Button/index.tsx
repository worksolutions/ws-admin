import React from "react";

import Wrapper from "primitives/Wrapper";

import ButtonWrapper, { BaseButtonWrapperInterface } from "./ButtonWrapper";

interface ButtonInterface extends BaseButtonWrapperInterface {
  children: React.ReactNode;
  onClick: () => void;
}

function Button({ children, onClick, ...buttonWrapperProps }: ButtonInterface) {
  return (
    <ButtonWrapper {...buttonWrapperProps}>
      {(styles, icons) => (
        <Wrapper as="button" styles={styles} onClick={onClick}>
          {children}
          {icons}
        </Wrapper>
      )}
    </ButtonWrapper>
  );
}

export default React.memo(Button);

export { ButtonType, ButtonSize } from "./ButtonWrapper";
