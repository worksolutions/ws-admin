import React from "react";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

export default function () {
  return (
    <>
      <Wrapper>
        <Button disabled size={ButtonSize.LARGE} type={ButtonType.PRIMARY} onClick={console.log} iconLeft="alert">
          DISABLED PRIMARY
        </Button>
        <Button size={ButtonSize.LARGE} type={ButtonType.PRIMARY} onClick={console.log}>
          LARGE PRIMARY
        </Button>
        <Button size={ButtonSize.LARGE} type={ButtonType.PRIMARY} onClick={console.log} iconLeft="alert">
          LARGE PRIMARY ICON LEFT
        </Button>
        <Button size={ButtonSize.LARGE} type={ButtonType.PRIMARY} onClick={console.log} iconRight="alert">
          LARGE PRIMARY ICON RIGHT
        </Button>
        <Button
          size={ButtonSize.LARGE}
          type={ButtonType.PRIMARY}
          onClick={console.log}
          iconLeft="alert"
          iconRight="alert"
        >
          LARGE PRIMARY ICON
        </Button>
      </Wrapper>
      <Wrapper>
        <Button size={ButtonSize.MEDIUM} type={ButtonType.PRIMARY} onClick={console.log}>
          MEDIUM PRIMARY
        </Button>
        <Button size={ButtonSize.MEDIUM} type={ButtonType.PRIMARY} onClick={console.log} iconLeft="alert">
          MEDIUM PRIMARY ICON LEFT
        </Button>
        <Button size={ButtonSize.MEDIUM} type={ButtonType.PRIMARY} onClick={console.log} iconRight="alert">
          MEDIUM PRIMARY ICON RIGHT
        </Button>
        <Button
          size={ButtonSize.MEDIUM}
          type={ButtonType.PRIMARY}
          onClick={console.log}
          iconLeft="alert"
          iconRight="alert"
        >
          MEDIUM PRIMARY ICON
        </Button>
      </Wrapper>
      <Wrapper>
        <Button size={ButtonSize.SMALL} type={ButtonType.PRIMARY} onClick={console.log}>
          SMALL PRIMARY
        </Button>
        <Button size={ButtonSize.SMALL} type={ButtonType.PRIMARY} onClick={console.log} iconLeft="alert">
          SMALL PRIMARY ICON LEFT
        </Button>
        <Button size={ButtonSize.SMALL} type={ButtonType.PRIMARY} onClick={console.log} iconRight="alert">
          SMALL PRIMARY ICON RIGHT
        </Button>
        <Button
          size={ButtonSize.SMALL}
          type={ButtonType.PRIMARY}
          onClick={console.log}
          iconLeft="alert"
          iconRight="alert"
        >
          SMALL PRIMARY ICON
        </Button>
      </Wrapper>
    </>
  );
}
