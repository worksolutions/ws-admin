import React from "react";

import RadioGroup, { RadioGroupSize } from "primitives/RadioGroup";
import Wrapper from "primitives/Wrapper";

import { ai, Aligns, flex, flexColumn, marginBottom } from "libs/styles";

const items = [
  { code: "1", title: "Любое значение" },
  { code: "2", title: "Вариант 1" },
  { code: "3", title: "Вариант 2" },
  { code: "4", title: "Вариант 3" },
  { code: "5", title: "Вариант 4" },
];

function RadioGroups() {
  const [value, setValue] = React.useState(items[0].code);
  return (
    <Wrapper styles={[flex, flexColumn, ai(Aligns.START)]}>
      <RadioGroup
        styles={marginBottom(8)}
        size={RadioGroupSize.MEDIUM}
        active={value}
        onChange={setValue}
        items={items}
      />
      <RadioGroup size={RadioGroupSize.SMALL} active={value} onChange={setValue} items={items} />
    </Wrapper>
  );
}

export default React.memo(RadioGroups);
