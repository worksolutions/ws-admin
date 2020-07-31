import React from "react";

import Wrapper from "primitives/Wrapper";
import Icon from "primitives/Icon";
import Typography from "primitives/Typography";

import { withPerformance } from "libs/CB/changeDetectionStrategy/withPerformance";
import { fullHeight, left, position, top, transform, transition } from "libs/styles";

import { UseSortingType } from "../../libs";

import { SortingDirection } from "types/Sorting";

interface HeaderColumnText {
  title: string;
  sortable: boolean;
  currentSortingField: UseSortingType["currentSortingField"];
  headerColumnId: string;
}

function HeaderColumnText({ title, sortable, currentSortingField, headerColumnId }: HeaderColumnText) {
  return (
    <Typography type="caption-semi-bold" color="gray-blue/05" styles={position("relative")}>
      {title}
      {sortable && currentSortingField && currentSortingField.id === headerColumnId && (
        <Wrapper
          styles={[
            transition("transform 0.2s"),
            position("absolute"),
            top("50%"),
            left("calc(100% + 8px)"),
            fullHeight,
            transform(
              `translateY(-50%) ${
                currentSortingField.direction === SortingDirection.DESC ? "rotateZ(0deg)" : "scale(1, -1)"
              }`,
            ),
          ]}
        >
          <Icon icon="sort-desc" width={16} height={16} />
        </Wrapper>
      )}
    </Typography>
  );
}

export default withPerformance(["sortable", "title"])(HeaderColumnText);
