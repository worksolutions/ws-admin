import React from "react";
import { HeaderGroup } from "react-table";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Icon from "primitives/Icon";

import {
  top,
  borderBottom,
  padding,
  position,
  textAlign,
  transform,
  transition,
  left,
  fullHeight,
  pointer,
} from "libs/styles";

import { UseSortingType } from "../libs";
import { TableSortingType } from "../types";

export default React.memo(function ({
  trHeaderGroup,
  sorting,
}: {
  trHeaderGroup: HeaderGroup<any>;
  sorting: UseSortingType;
}) {
  return (
    <Wrapper as="thead">
      <Wrapper as="tr" {...trHeaderGroup.getHeaderGroupProps()}>
        {trHeaderGroup.headers.map((column) => {
          const { key, ...props } = column.getHeaderProps();
          const header = column.render("Header") as any;
          return (
            <Wrapper
              as="th"
              key={key}
              {...props}
              styles={[
                textAlign("left"),
                borderBottom(1, "gray-blue/02"),
                padding("12px 16px"),
                header.sortable && pointer,
              ]}
              onClick={() => header.sortable && sorting.nextSorting(column.id)}
            >
              <Typography type="caption-semi-bold" color="gray-blue/05" styles={position("relative")}>
                {header.title}
                {header.sortable && sorting.currentSortingField && sorting.currentSortingField.field === column.id && (
                  <Wrapper
                    styles={[
                      transition("transform 0.2s"),
                      position("absolute"),
                      top("50%"),
                      left("100%"),
                      fullHeight,
                      transform(
                        `translateY(-50%) ${
                          sorting.currentSortingField.type === TableSortingType.DESC
                            ? "rotateZ(180deg)"
                            : "rotateZ(0deg)"
                        }`,
                      ),
                    ]}
                  >
                    <Icon iconName="16-triangle-down-alt" width={16} height={16} />
                  </Wrapper>
                )}
              </Typography>
            </Wrapper>
          );
        })}
      </Wrapper>
    </Wrapper>
  );
});
