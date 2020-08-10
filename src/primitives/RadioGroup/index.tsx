import React, { Fragment } from "react";
import { propEq } from "ramda";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  backgroundColor,
  border,
  borderNone,
  borderRadius,
  boxShadow,
  disableOutline,
  flex,
  focus,
  horizontalPadding,
  marginBottom,
  marginTop,
  opacity,
  overflow,
  padding,
  pointer,
  position,
  transition,
  verticalPadding,
  zIndex,
} from "libs/styles";
import { useChildrenWidthDetector } from "libs/hooks/useChildrenWidthDetector";

import ActiveBackplate from "./ActiveBackplate";
import Divider from "./Divider";

import SuggestInterface from "types/SuggestInterface";

export enum RadioGroupSize {
  MEDIUM,
  SMALL,
}

interface RadioGroupInterface<ITEM extends string | number> {
  styles?: any;
  active: ITEM;
  items: SuggestInterface<ITEM>[];
  size?: RadioGroupSize;
  onChange: (active: ITEM) => void;
}

const paddingBySize: Record<
  RadioGroupSize,
  { vertical: number; horizontal: number; dividerVerticalPadding: number }
> = {
  [RadioGroupSize.MEDIUM]: { vertical: 4, horizontal: 20, dividerVerticalPadding: 9 },
  [RadioGroupSize.SMALL]: { vertical: 0, horizontal: 16, dividerVerticalPadding: 5 },
};

function RadioGroups({ active, size = RadioGroupSize.MEDIUM, items, styles, onChange }: RadioGroupInterface<string>) {
  const { ref, widths } = useChildrenWidthDetector();

  const paddingValue = paddingBySize[size];

  const { activeIndex, activeIndexInWidthsArray } = React.useMemo(() => {
    const activeIndex = items.findIndex(propEq("code", active));
    const activeIndexInWidthsArray = activeIndex + activeIndex;
    return { activeIndex, activeIndexInWidthsArray };
  }, [active, items]);

  const lastItemsIndex = React.useMemo(() => items.length - 1, [items]);

  return (
    <Wrapper
      styles={[
        position("relative"),
        flex,
        borderRadius(50),
        border(1, "gray-blue/02"),
        backgroundColor("gray-blue/01"),
        overflow("hidden"),
        styles,
        padding(1),
      ]}
    >
      <ActiveBackplate activeIndex={activeIndex} activeIndexInWidthsArray={activeIndexInWidthsArray} widths={widths} />
      <Wrapper ref={ref} styles={[flex, zIndex(1)]}>
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <Fragment key={item.code}>
              <Wrapper
                as="button"
                disabled={isActive}
                styles={[
                  transition("box-shadow 0.2s"),
                  borderRadius(50),
                  disableOutline,
                  borderNone,
                  backgroundColor("transparent"),
                  verticalPadding(paddingValue.vertical),
                  horizontalPadding(paddingValue.horizontal),
                  !isActive && pointer,
                  focus(boxShadow([0, 0, 0, 2, "blue/04", true])),
                ]}
                onClick={() => !isActive && onChange(item.code)}
              >
                <Typography styles={transition("color 0.2s")} color={isActive ? "gray-blue/09" : "gray-blue/07"}>
                  {item.title}
                </Typography>
              </Wrapper>
              {index !== lastItemsIndex && (
                <Divider
                  styles={[
                    verticalPadding(paddingValue.dividerVerticalPadding),
                    opacity(isActive || activeIndex === index + 1 ? 0 : 1),
                  ]}
                />
              )}
            </Fragment>
          );
        })}
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(RadioGroups) as <T extends string | number>(props: RadioGroupInterface<T>) => JSX.Element;
