import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import LayoutGrid from "primitives/LayoutGrid";

import { child, flex, flexColumn, flexShrink, horizontalPadding, marginBottom, marginTop, maxWidth } from "libs/styles";

import { FieldListComponentInterface } from "./types";
import FieldItemElementRenderer from "./Elements";
import { useAppContext } from "modules/context/hooks/useAppContext";

function HorizontalFieldsList({ options, styles }: Omit<FieldListComponentInterface, "useTitleWidthCalculation">) {
  return (
    <LayoutGrid marginBetweenElements={16} eachChildStyles={marginTop(16)} styles={[horizontalPadding(12), styles]}>
      {options!.fields.map((field, key) => (
        <Wrapper key={key} styles={[flex, flexColumn, child([marginTop(12)], ".modifier")]}>
          {field.title && (
            <Typography styles={[flexShrink(0), marginBottom(16)]} color="gray-blue/05">
              {field.title}
            </Typography>
          )}
          <FieldItemElementRenderer type={field.type} options={field.options} styles={maxWidth(800)} />
        </Wrapper>
      ))}
    </LayoutGrid>
  );
}

export default React.memo(HorizontalFieldsList);
