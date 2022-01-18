import React from "react";

import Tabs from "primitives/Tabs";
import Wrapper from "primitives/Wrapper";

import { Aligns, child, flex, flexColumn, jc, marginBottom } from "libs/styles";

function TabsElement() {
  const [activeIndex, setActiveIndex] = React.useState(2);
  return (
    <Wrapper styles={[flex, flexColumn, child([flex, jc(Aligns.CENTER), marginBottom(50)])]}>
      <Tabs
        items={[
          { render: () => <div>1</div>, title: "Атрибуты" },
          { render: () => <div />, title: "Текст" },
          { render: () => <div />, title: "Статьи по теме" },
        ]}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </Wrapper>
  );
}

export default TabsElement;
