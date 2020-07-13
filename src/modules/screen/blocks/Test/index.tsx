import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import Input from "primitives/Input/Input";

import {
  ai,
  Aligns,
  borderRight,
  child,
  flex,
  flexColumn,
  flexWrap,
  marginBottom,
  marginRight,
  padding,
  paddingRight,
} from "libs/styles";
import Password from "../../../../primitives/Input/Password";

function TestPage() {
  const [inputValue, setInputValue] = React.useState("");
  return (
    <Wrapper
      styles={[
        padding("16px 24px"),
        flex,
        child([marginRight(6), borderRight(1, "gray-blue/09"), paddingRight(6), ai(Aligns.START)]),
        flexWrap,
      ]}
    >
      <Wrapper styles={[flex, flexColumn, child(marginBottom(6))]}>
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
      <Wrapper styles={[flex, flexColumn, child(marginBottom(6))]}>
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
      <Wrapper styles={[flex, flexColumn, child(marginBottom(6))]}>
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

      <Wrapper styles={[flex, flexColumn, child(marginBottom(6))]}>
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
      <Wrapper styles={[flex, flexColumn, child(marginBottom(6))]}>
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
      <Wrapper styles={[flex, flexColumn, child(marginBottom(6))]}>
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

      <Wrapper styles={[flex, flexColumn, child(marginBottom(6))]}>
        <Input
          tip="default"
          iconRight="bullseye-arrow"
          iconLeft="settings"
          placeholder="one"
          value={inputValue}
          onChange={setInputValue}
        />
        <Input tip="error" placeholder="one" error value={inputValue} onChange={setInputValue} />
        <Input tip="success" placeholder="one" success value={inputValue} onChange={setInputValue} />
        <Password placeholder="one" value={inputValue} onChange={setInputValue} />
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(observer(TestPage));
