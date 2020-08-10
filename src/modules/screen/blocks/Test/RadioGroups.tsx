import React from "react";

import RadioGroup, { RadioGroupSize } from "primitives/RadioGroup";
import Wrapper from "primitives/Wrapper";

import { ai, Aligns, flex, flexColumn, marginBottom } from "libs/styles";

const items = ["Любой", "Вариант 1", "Вариант 2", "Вариант 3", "Вариант 4"];

function RadioGroups() {
  const [value, setValue] = React.useState(items[0]);
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
