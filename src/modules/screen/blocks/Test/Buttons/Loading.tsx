import React from "react";

import Button, { ButtonType } from "primitives/Button";
import Wrapper from "primitives/Wrapper";

export default function () {
  return (
    <Wrapper>
      <Button loading onClick={console.log}>
        Авторизация
      </Button>
      <Button loading disabled iconLeft="delete" onClick={console.log}>
        Автор
      </Button>
      <Button loading disabled type={ButtonType.SECONDARY} iconLeft="delete" onClick={console.log}>
        Автор
      </Button>
      <Button loading disabled type={ButtonType.GHOST} iconLeft="delete" onClick={console.log}>
        Автор
      </Button>
    </Wrapper>
  );
}
