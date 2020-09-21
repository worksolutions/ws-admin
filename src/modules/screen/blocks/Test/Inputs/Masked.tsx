import React from "react";

import Wrapper from "primitives/Wrapper";
import MaskedInput, { makeMask } from "primitives/Input/MaskedInput";
import Password from "primitives/Input/Password";
import DatePicker, { DatePickerMode } from "primitives/DatePicker";

const dateMaskCharacters = [/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/];
const phoneMaskCharacters = ["+", "7", " ", /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/];
const maskCharacter = "_";
const calendarMask = makeMask(dateMaskCharacters);
const phoneMask = makeMask(phoneMaskCharacters);

export default function () {
  const [inputDate, setInputDate] = React.useState("");
  const [inputPhone, setInputPhone] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");

  return (
    <>
      <Wrapper>
        <MaskedInput
          value={inputDate}
          mask={calendarMask}
          guide
          showMaskWhenEmpty
          maskCharacter={maskCharacter}
          iconRight="calendar"
          onChange={setInputDate}
        />
        <DatePicker mode={DatePickerMode.DATE} hasCurrentDayButton onChange={console.log} />
        <MaskedInput
          value={inputPhone}
          mask={phoneMask}
          guide
          placeholder="+7"
          maskCharacter={maskCharacter}
          onChange={setInputPhone}
        />
        <Password placeholder="one" value={inputPassword} onChange={setInputPassword} />
      </Wrapper>
    </>
  );
}
