import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import LayoutGrid from "primitives/LayoutGrid";

import { ai, Aligns, flex, flexColumn, flexShrink, horizontalPadding, marginBottom, maxWidth } from "libs/styles";

import { FieldListComponentInterface } from "./types";
import FieldItemElementRenderer from "./Elements";

function VerticalFieldsList({ options, styles }: Omit<FieldListComponentInterface, "useTitleWidthCalculation">) {
  return (
    <LayoutGrid
      marginRight={16}
      marginTop={16}
      minWidth={242}
      styles={[horizontalPadding(12), ai(Aligns.STRETCH), styles]}
    >
      {options!.fields.map((field, key) => (
        <Wrapper key={key} styles={[flex, flexColumn]}>
          <Typography styles={[flexShrink(0), marginBottom(16)]} color="gray-blue/05">
            {field.title}:
          </Typography>
          <FieldItemElementRenderer type={field.type} options={field.options} styles={maxWidth(800)} />
        </Wrapper>
      ))}
    </LayoutGrid>
  );
}

export default React.memo(VerticalFieldsList);
