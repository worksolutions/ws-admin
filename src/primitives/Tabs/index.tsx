import React from "react";
import { sum } from "ramda";
import { duration200 } from "layout/durations";

import Wrapper from "primitives/Wrapper";

import { backgroundColor, borderRadius, bottom, flex, height, left, position, transition, width } from "libs/styles";
import { useChildrenWidthDetector } from "libs/hooks/useChildrenWidthDetector";

import Tab, { tabHorizontalPadding } from "./Tab";

interface TabsInterface {
  styles?: any;
  initialActive?: number;
  items: {
    title: string;
    render: () => JSX.Element;
  }[];
}

function getLeft(widths: number[], index: number) {
  return sum(widths.slice(0, index)) + tabHorizontalPadding;
}

function Tabs({ initialActive = 0, items, styles }: TabsInterface) {
  const [active, setActive] = React.useState(initialActive);
  const { ref, widths } = useChildrenWidthDetector();

  const Component = items[active].render;

  return (
    <>
      <Wrapper ref={ref} styles={[flex, position("relative"), styles]}>
        {items.map(({ title }, key) => (
          <Tab key={key} active={active === key} title={title} onClick={() => setActive(key)} />
        ))}
        {widths && widths.length !== 0 && (
          <Wrapper
            styles={[
              borderRadius(2),
              transition(`left ${duration200}, width ${duration200}`),
              left(getLeft(widths, active)),
              position("absolute"),
              width(widths[active] - tabHorizontalPadding * 2),
              bottom(-1),
              height(2),
              backgroundColor("blue/05"),
            ]}
          />
        )}
      </Wrapper>
      <Component />
    </>
  );
}

export default React.memo(Tabs);
