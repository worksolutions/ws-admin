import React from "react";

import Wrapper from "primitives/Wrapper";
import Toggle from "primitives/Toggle";

import { Aligns, child, flex, flexColumn, jc, marginBottom } from "libs/styles";

function ToggleElement() {
  const [switched, setSwitched] = React.useState(false);

  return (
    <Wrapper styles={[flex, flexColumn, jc(Aligns.CENTER), child(marginBottom(30))]}>
      <Toggle enabled={switched} onChange={setSwitched} />
      <Toggle text="asd" enabled={switched} onChange={setSwitched} />
      <Toggle textOnRight text="asd" enabled={switched} onChange={setSwitched} />
    </Wrapper>
  );
}

export default ToggleElement;
