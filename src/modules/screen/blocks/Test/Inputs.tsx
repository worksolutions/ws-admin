import React from "react";

import Wrapper from "primitives/Wrapper";
import Input from "primitives/Input/Input";
import Password from "primitives/Input/Password";
import DatePicker, { DatePickerMode } from "primitives/DatePicker";

import { ai, Aligns, flex, flexColumn, marginTop } from "libs/styles";

function Inputs() {
  const [inputValue, setInputValue] = React.useState("");
  return (
    <Wrapper styles={[flex, flexColumn, ai(Aligns.START)]}>
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
      <DatePicker mode={DatePickerMode.DATE} outerStyles={marginTop(12)} onChange={console.log} />
      <DatePicker mode={DatePickerMode.TIME} outerStyles={marginTop(12)} onChange={console.log} />
      <DatePicker
        allowEmpty={false}
        mode={DatePickerMode.DATE_TIME}
        outerStyles={marginTop(12)}
        onChange={console.log}
      />
    </Wrapper>
  );
}

export default React.memo(Inputs);
