import React from "react";

import Wrapper from "primitives/Wrapper";
import Input, { InputSize } from "primitives/Input/Input";

import { marginBottom } from "libs/styles";

export default function () {
  const [inputValue, setInputValue] = React.useState("");
  return (
    <>
      <Wrapper>
        <Input
          multiline
          outerStyles={marginBottom(16)}
          placeholder="default"
          value={inputValue}
          onChange={setInputValue}
        />
        <Input
          multiline
          outerStyles={marginBottom(16)}
          disabled
          placeholder="disabled"
          value={inputValue}
          onChange={setInputValue}
        />
        <Input
          multiline
          outerStyles={marginBottom(16)}
          tip="default"
          placeholder="one"
          value={inputValue}
          onChange={setInputValue}
        />
        <Input
          multiline
          outerStyles={marginBottom(16)}
          tip="error"
          placeholder="one"
          error
          value={inputValue}
          onChange={setInputValue}
        />
        <Input
          multiline
          outerStyles={marginBottom(16)}
          tip="success"
          placeholder="one"
          success
          value={inputValue}
          onChange={setInputValue}
        />
      </Wrapper>
      <Wrapper>
        <Input
          multiline
          iconRight="bullseye-arrow"
          outerStyles={marginBottom(16)}
          placeholder="default"
          value={inputValue}
          onChange={setInputValue}
        />
        <Input
          multiline
          iconRight="bullseye-arrow"
          outerStyles={marginBottom(16)}
          disabled
          placeholder="disabled"
          value={inputValue}
          onChange={setInputValue}
        />
        <Input
          multiline
          outerStyles={marginBottom(16)}
          tip="default"
          iconRight="bullseye-arrow"
          iconLeft="settings"
          placeholder="one"
          value={inputValue}
          onChange={setInputValue}
        />
        <Input
          multiline
          iconRight="bullseye-arrow"
          outerStyles={marginBottom(16)}
          tip="error"
          placeholder="one"
          error
          value={inputValue}
          onChange={setInputValue}
        />
        <Input
          multiline
          iconRight="bullseye-arrow"
          outerStyles={marginBottom(16)}
          tip="success"
          placeholder="one"
          success
          value={inputValue}
          onChange={setInputValue}
        />
      </Wrapper>
    </>
  );
}
