import React from "react";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

export default function () {
  return (
    <>
      <Wrapper>
        <Button disabled size={ButtonSize.LARGE} type={ButtonType.SECONDARY} onClick={console.log} iconLeft="alert">
          DISABLED SECONDARY
        </Button>
        <Button size={ButtonSize.LARGE} type={ButtonType.SECONDARY} onClick={console.log}>
          LARGE SECONDARY
        </Button>
        <Button size={ButtonSize.LARGE} type={ButtonType.SECONDARY} onClick={console.log} iconLeft="alert">
          LARGE SECONDARY ICON LEFT
        </Button>
        <Button size={ButtonSize.LARGE} type={ButtonType.SECONDARY} onClick={console.log} iconRight="alert">
          LARGE SECONDARY ICON RIGHT
        </Button>
        <Button
          size={ButtonSize.LARGE}
          type={ButtonType.SECONDARY}
          onClick={console.log}
          iconLeft="alert"
          iconRight="alert"
        >
          LARGE SECONDARY ICON
        </Button>
      </Wrapper>
      <Wrapper>
        <Button size={ButtonSize.MEDIUM} type={ButtonType.SECONDARY} onClick={console.log}>
          MEDIUM SECONDARY
        </Button>
        <Button size={ButtonSize.MEDIUM} type={ButtonType.SECONDARY} onClick={console.log} iconLeft="alert">
          MEDIUM SECONDARY ICON LEFT
        </Button>
        <Button size={ButtonSize.MEDIUM} type={ButtonType.SECONDARY} onClick={console.log} iconRight="alert">
          MEDIUM SECONDARY ICON RIGHT
        </Button>
        <Button
          size={ButtonSize.MEDIUM}
          type={ButtonType.SECONDARY}
          onClick={console.log}
          iconLeft="alert"
          iconRight="alert"
        >
          MEDIUM SECONDARY ICON
        </Button>
      </Wrapper>
      <Wrapper>
        <Button size={ButtonSize.SMALL} type={ButtonType.SECONDARY} onClick={console.log}>
          SMALL SECONDARY
        </Button>
      </Wrapper>
    </>
  );
}
