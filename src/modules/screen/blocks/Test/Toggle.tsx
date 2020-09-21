import React from "react";

import Wrapper from "primitives/Wrapper";
import Toggle from "primitives/Toggle";

function ToggleElement() {
  const [switched, setSwitched] = React.useState(false);

  return (
    <Wrapper>
      <Toggle enabled={switched} onChange={setSwitched} />
      <Toggle text="asd" enabled={switched} onChange={setSwitched} />
      <Toggle textOnRight text="asd" enabled={switched} onChange={setSwitched} />
    </Wrapper>
  );
}

export default ToggleElement;
