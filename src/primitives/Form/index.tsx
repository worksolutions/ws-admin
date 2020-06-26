import React from "react";

import preventDefault from "libs/preventDefault";

import Wrapper, { WrapperInterface } from "../Wrapper";

interface FormInterface extends WrapperInterface {
  children: React.ReactNode;
  onSubmit: () => void;
}

function Form({ children, onSubmit, ...props }: FormInterface) {
  return (
    <Wrapper {...props} as="form" onSubmit={preventDefault(onSubmit)}>
      {children}
    </Wrapper>
  );
}

export default React.memo(Form);
