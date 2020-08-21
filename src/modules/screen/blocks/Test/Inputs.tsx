import React from "react";

import Wrapper from "primitives/Wrapper";
import Input from "primitives/Input/Input";
import Password from "primitives/Input/Password";
import DatePicker, { DatePickerMode } from "primitives/DatePicker";

import { ai, Aligns, flex, flexColumn, marginBottom } from "libs/styles";

function Inputs() {
  const [inputValue, setInputValue] = React.useState("");
  return (
    <Wrapper styles={[flex, flexColumn, ai(Aligns.START)]}>
      <Input
        outerStyles={marginBottom(16)}
        tip="default"
        iconRight="bullseye-arrow"
        iconLeft="settings"
        placeholder="one"
        value={inputValue}
        onChange={setInputValue}
      />
      <Input
        outerStyles={marginBottom(16)}
        tip="error"
        placeholder="one"
        error
        value={inputValue}
        onChange={setInputValue}
      />
      <Input
        outerStyles={marginBottom(16)}
        tip="success"
        placeholder="one"
        success
        value={inputValue}
        onChange={setInputValue}
      />
      <Password outerStyles={marginBottom(16)} placeholder="one" value={inputValue} onChange={setInputValue} />
      <DatePicker mode={DatePickerMode.DATE} hasCurrentDayButton onChange={console.log} />
    </Wrapper>
  );
}

export default React.memo(Inputs);
