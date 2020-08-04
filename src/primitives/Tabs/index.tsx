import React from "react";
import { sum } from "ramda";
import { duration200 } from "layout/durations";

import Wrapper from "primitives/Wrapper";

import { backgroundColor, borderRadius, bottom, flex, height, left, position, transition, width } from "libs/styles";
import { useForceUpdate } from "libs/hooks/common";

import Tab, { calculateWidthDelayTime, tabHorizontalPadding } from "./Tab";

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
  const update = useForceUpdate();
  const widths = React.useRef<number[]>([]);

  React.useEffect(() => {
    setTimeout(update, calculateWidthDelayTime);
  }, []);

  const Component = items[active].render;

  return (
    <>
      <Wrapper styles={[flex, position("relative"), styles]}>
        {items.map(({ title }, key) => (
          <Tab
            onWidthDetect={(width) => (widths.current[key] = width)}
            key={key}
            active={active === key}
            title={title}
            onClick={() => setActive(key)}
          />
        ))}
        {widths.current.length !== 0 && (
          <Wrapper
            styles={[
              borderRadius(2),
              transition(`left ${duration200}, width ${duration200}`),
              left(getLeft(widths.current, active)),
              position("absolute"),
              width(widths.current[active] - tabHorizontalPadding * 2),
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
