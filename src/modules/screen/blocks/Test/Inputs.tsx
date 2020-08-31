import React from "react";

import Wrapper from "primitives/Wrapper";
import Input from "primitives/Input/Input";
import Password from "primitives/Input/Password";
import DatePicker, { DatePickerMode } from "primitives/DatePicker";
import MaskedInput, { makeMask } from "primitives/Input/MaskedInput";

import { ai, Aligns, flex, flexColumn, marginBottom } from "libs/styles";

const mask = makeMask([/\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]);

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
      <MaskedInput
        outerStyles={marginBottom(16)}
        tip="tip1"
        title="masked input"
        guide
        showMaskWhenEmpty
        value={inputValue}
        mask={mask}
        onChange={setInputValue}
      />
      <MaskedInput
        outerStyles={marginBottom(16)}
        error
        tip="tip2"
        title="error masked input"
        guide
        showMaskWhenEmpty
        value={inputValue}
        mask={mask}
        onChange={setInputValue}
      />
      <DatePicker mode={DatePickerMode.DATE} hasCurrentDayButton onChange={console.log} />
    </Wrapper>
  );
}

export default React.memo(Inputs);
