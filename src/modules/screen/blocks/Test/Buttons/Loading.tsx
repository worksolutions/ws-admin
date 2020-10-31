import React from "react";

import Button, { ButtonType } from "primitives/Button";
import Wrapper from "primitives/Wrapper";

export default function () {
  return (
    <Wrapper>
      <Button loadingRight onClick={console.log}>
        Авторизация
      </Button>
      <Button loadingRight disabled iconLeft="delete" onClick={console.log}>
        Автор
      </Button>
      <Button loadingRight disabled type={ButtonType.SECONDARY} iconLeft="delete" onClick={console.log}>
        Автор
      </Button>
      <Button loadingRight disabled type={ButtonType.GHOST} iconLeft="delete" onClick={console.log}>
        Автор
      </Button>
    </Wrapper>
  );
}
