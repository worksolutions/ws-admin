import React from "react";

import Button, { ButtonSize, ButtonType } from "primitives/Button";
import Wrapper from "primitives/Wrapper";

export default function () {
  return (
    <>
      <Wrapper>
        <Button disabled size={ButtonSize.LARGE} type={ButtonType.GHOST} onClick={console.log} iconLeft="alert">
          DISABLED GHOST
        </Button>
        <Button size={ButtonSize.LARGE} type={ButtonType.GHOST} onClick={console.log}>
          LARGE GHOST
        </Button>
        <Button size={ButtonSize.LARGE} type={ButtonType.GHOST} onClick={console.log} iconLeft="alert">
          LARGE GHOST ICON LEFT
        </Button>
        <Button size={ButtonSize.LARGE} type={ButtonType.GHOST} onClick={console.log} iconRight="alert">
          LARGE GHOST ICON RIGHT
        </Button>
        <Button
          size={ButtonSize.LARGE}
          type={ButtonType.GHOST}
          onClick={console.log}
          iconLeft="alert"
          iconRight="alert"
        >
          LARGE GHOST ICON
        </Button>
      </Wrapper>
      <Wrapper>
        <Button size={ButtonSize.MEDIUM} type={ButtonType.GHOST} onClick={console.log}>
          MEDIUM GHOST
        </Button>
        <Button size={ButtonSize.MEDIUM} type={ButtonType.GHOST} onClick={console.log} iconLeft="alert">
          MEDIUM GHOST ICON LEFT
        </Button>
        <Button size={ButtonSize.MEDIUM} type={ButtonType.GHOST} onClick={console.log} iconRight="alert">
          MEDIUM GHOST ICON RIGHT
        </Button>
        <Button
          size={ButtonSize.MEDIUM}
          type={ButtonType.GHOST}
          onClick={console.log}
          iconLeft="alert"
          iconRight="alert"
        >
          MEDIUM GHOST ICON
        </Button>
      </Wrapper>
      <Wrapper>
        <Button size={ButtonSize.SMALL} type={ButtonType.GHOST} onClick={console.log}>
          SMALL GHOST
        </Button>
        <Button size={ButtonSize.SMALL} type={ButtonType.GHOST} onClick={console.log} iconLeft="alert">
          SMALL GHOST ICON LEFT
        </Button>
        <Button size={ButtonSize.SMALL} type={ButtonType.GHOST} onClick={console.log} iconRight="alert">
          SMALL GHOST ICON RIGHT
        </Button>
        <Button
          size={ButtonSize.SMALL}
          type={ButtonType.GHOST}
          onClick={console.log}
          iconLeft="alert"
          iconRight="alert"
        >
          SMALL GHOST ICON
        </Button>
      </Wrapper>
    </>
  );
}
