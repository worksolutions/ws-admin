import React, { Ref } from "react";
import { isNil } from "ramda";
import { duration160 } from "layout/durations";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  alignContent,
  Aligns,
  backgroundColor,
  border,
  borderNone,
  borderRadius,
  boxShadow,
  child,
  disableOutline,
  flex,
  flexWrap,
  focus,
  fullWidth,
  height,
  hover,
  marginBottom,
  marginLeft,
  marginRight,
  maxHeight,
  nthChild,
  overflowY,
  pointer,
  transition,
  width,
} from "libs/styles";
import { withPerformance } from "libs/CB/changeDetectionStrategy/withPerformance";
import { useScrollToElement } from "libs/hooks/scroll";

interface ButtonsListInterface {
  items: (string | number | null)[];
  selectedItemIndex: number | null;
  onClick: (index: number) => void;
}

const SelectedItem = React.memo(
  React.forwardRef(function ({ value }: { value: string | number }, ref: Ref<HTMLElement>) {
    return (
      <Wrapper
        ref={ref}
        as="button"
        styles={[disableOutline, borderNone, width(80), height(44), borderRadius(6), backgroundColor("blue/05")]}
      >
        <Typography color="white">{value}</Typography>
      </Wrapper>
    );
  }),
);

const UnSelectedItem = withPerformance(["onClick"])(function ({
  value,
  onClick,
}: {
  value: string | number;
  onClick: () => void;
}) {
  return (
    <Wrapper
      as="button"
      styles={[
        pointer,
        disableOutline,
        width(80),
        height(44),
        borderRadius(6),
        border(1, "gray-blue/02"),
        backgroundColor("white"),
        transition(`box-shadow ${duration160}, background-color ${duration160}`),
        hover(backgroundColor("gray-blue/01")),
        focus(boxShadow([0, 0, 0, 2, "blue/04"])),
      ]}
      onClick={onClick}
    >
      <Typography color="gray-blue/07">{value}</Typography>
    </Wrapper>
  );
});

function ButtonsList({ items, selectedItemIndex, onClick }: ButtonsListInterface) {
  const { run, scrollRef, scrollToElementRef } = useScrollToElement(true);
  React.useEffect(run, []);

  return (
    <Wrapper
      ref={scrollRef}
      styles={[
        fullWidth,
        maxHeight(256),
        flex,
        flexWrap,
        overflowY("overlay"),
        alignContent(Aligns.START),
        child([marginRight(8), marginBottom(8)]),
        nthChild("3n + 1", marginLeft(12)),
        nthChild("3n", marginRight(12)),
      ]}
    >
      {items.map((item, index) =>
        isNil(item) ? null : selectedItemIndex === index ? (
          <SelectedItem key={item} ref={scrollToElementRef} value={item} />
        ) : (
          <UnSelectedItem key={item} value={item} onClick={() => onClick(index)} />
        ),
      )}
    </Wrapper>
  );
}

export default React.memo(ButtonsList);
