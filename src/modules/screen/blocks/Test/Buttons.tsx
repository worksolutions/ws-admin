import React from "react";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

function Buttons() {
  return (
    <>
      <Wrapper>
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

      <Wrapper>
        <Button size={ButtonSize.LARGE} type={ButtonType.ICON} onClick={console.log} />
        <Button size={ButtonSize.LARGE} type={ButtonType.ICON} onClick={console.log} iconLeft="alert" />
        <Button size={ButtonSize.LARGE} type={ButtonType.ICON} onClick={console.log} iconRight="alert" />
        <Button
          size={ButtonSize.LARGE}
          type={ButtonType.ICON}
          onClick={console.log}
          iconLeft="alert"
          iconRight="alert"
        />
      </Wrapper>
      <Wrapper>
        <Button size={ButtonSize.MEDIUM} type={ButtonType.ICON} onClick={console.log} />
        <Button size={ButtonSize.MEDIUM} type={ButtonType.ICON} onClick={console.log} iconLeft="alert" />
        <Button size={ButtonSize.MEDIUM} type={ButtonType.ICON} onClick={console.log} iconRight="alert" />
        <Button
          size={ButtonSize.MEDIUM}
          type={ButtonType.ICON}
          onClick={console.log}
          iconLeft="alert"
          iconRight="alert"
        />
      </Wrapper>
      <Wrapper>
        <Button size={ButtonSize.SMALL} type={ButtonType.ICON} onClick={console.log} />
        <Button size={ButtonSize.SMALL} type={ButtonType.ICON} onClick={console.log} iconLeft="alert" />
        <Button size={ButtonSize.SMALL} type={ButtonType.ICON} onClick={console.log} iconRight="alert" />
        <Button
          size={ButtonSize.SMALL}
          type={ButtonType.ICON}
          onClick={console.log}
          iconLeft="alert"
          iconRight="alert"
        />
      </Wrapper>

      <Wrapper>
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

      <Wrapper>
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

      <Wrapper>
        <Button disabled size={ButtonSize.LARGE} type={ButtonType.PRIMARY} onClick={console.log} iconLeft="alert">
          DISABLED PRIMARY
        </Button>
        <Button disabled size={ButtonSize.LARGE} type={ButtonType.ICON} onClick={console.log} iconLeft="alert" />
        <Button disabled size={ButtonSize.LARGE} type={ButtonType.SECONDARY} onClick={console.log} iconLeft="alert">
          DISABLED SECONDARY
        </Button>
        <Button disabled size={ButtonSize.LARGE} type={ButtonType.GHOST} onClick={console.log} iconLeft="alert">
          DISABLED GHOST
        </Button>
      </Wrapper>
    </>
  );
}

export default Buttons;
