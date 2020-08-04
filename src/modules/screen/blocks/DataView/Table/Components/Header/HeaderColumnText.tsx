import React from "react";

import Wrapper from "primitives/Wrapper";
import Icon from "primitives/Icon";
import Typography from "primitives/Typography";

import { withPerformance } from "libs/CB/changeDetectionStrategy/withPerformance";
import {
  fullHeight,
  hover,
  left,
  opacity,
  paddingRight,
  position,
  top,
  transform,
  transition,
  willChange,
} from "libs/styles";

import { UseSortingType } from "../../libs";

import { SortingDirection } from "types/Sorting";

interface HeaderColumnText {
  title: string;
  sortable: boolean;
  currentSortingField: UseSortingType["currentSortingField"];
  headerColumnId: string;
}

function HeaderColumnText({ title, sortable, currentSortingField, headerColumnId }: HeaderColumnText) {
  const isIconVisible = currentSortingField?.id === headerColumnId;
  return (
    <Typography
      type="caption-semi-bold"
      color="gray-blue/05"
      styles={[position("relative"), paddingRight(8), !isIconVisible && hover(opacity(0.5), ".sortingIcon")]}
    >
      {title}
      {sortable && (
        <Wrapper
          className="sortingIcon"
          styles={[
            willChange("opacity, transform"),
            opacity(isIconVisible ? 1 : 0),
            transition("all 0.2s"),
            position("absolute"),
            top("50%"),
            left("100%"),
            fullHeight,
            transform(
              `translateY(-50%) ${
                currentSortingField.direction === SortingDirection.DESC ? "rotateZ(0deg)" : "scale(1, -1)"
              }`,
            ),
          ]}
        >
          <Icon iconName="sort-desc" width={16} height={16} />
        </Wrapper>
      )}
    </Typography>
  );
}

export default withPerformance(["sortable", "title"])(HeaderColumnText);
