import React, { useMemo } from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import LayoutGrid from "primitives/LayoutGrid";

import {
  alignSelf,
  child,
  flex,
  flexColumn,
  flexShrink,
  horizontalPadding,
  marginBottom,
  marginTop,
  maxWidth,
} from "libs/styles";

import { FieldListComponentInterface } from "../types";
import FieldItemElementRenderer from "../Elements";

function HorizontalFieldsList({
  options,
  styles,
  alignConfig,
}: Omit<FieldListComponentInterface, "useTitleWidthCalculation">) {
  const alignTitle = useMemo(() => {
    return alignConfig?.horizontal?.alignFieldRow;
  }, [alignConfig]);

  return (
    <LayoutGrid marginBetweenElements={16} eachChildStyles={marginTop(16)} styles={[horizontalPadding(12), styles]}>
      {options!.fields.map((field, key) => (
        <Wrapper key={key} styles={[flex, flexColumn, child([marginTop(12)], ".modifier")]}>
          {field.title && (
            <Typography
              styles={[
                flexShrink(0),
                marginBottom(16),
                alignConfig?.horizontal?.titleStyles,
                alignTitle && alignSelf(alignTitle),
              ]}
              color="gray-blue/05"
            >
              {field.title}
            </Typography>
          )}
          <FieldItemElementRenderer
            type={field.type}
            options={field.options}
            styles={[maxWidth(800), alignConfig?.horizontal?.elementStyles]}
          />
        </Wrapper>
      ))}
    </LayoutGrid>
  );
}

export default React.memo(HorizontalFieldsList);
