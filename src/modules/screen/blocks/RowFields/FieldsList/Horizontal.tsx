import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  ai,
  Aligns,
  flex,
  flexColumn,
  flexShrink,
  lastChild,
  marginBottom,
  marginRight,
  marginTop,
  maxWidth,
  textAlign,
  width,
} from "libs/styles";

import { useForceWidthStyles } from "../hooks";

import { FieldListComponentInterface, FieldListComponentViewMode } from "./types";
import FieldItemElementRenderer from "./Elements";

function HorizontalFieldsList({
  viewMode,
  options,
  forceTitleWidth,
  useTitleWidthCalculation,
  onCalculateTitleWidth,
  styles,
}: FieldListComponentInterface & { viewMode: FieldListComponentViewMode }) {
  const { forceWidth, widthRefs } = useForceWidthStyles(onCalculateTitleWidth);

  const calculateWidth = (index: number) => (ref: HTMLElement) => {
    if (!ref) return;
    widthRefs.current[index] = ref.getBoundingClientRect().width;
  };

  return (
    <Wrapper styles={[flex, flexColumn, marginTop(16), lastChild(marginBottom(0)), styles]}>
      {options!.fields.map((field, key) => {
        return (
          <Wrapper key={key} styles={[flex, marginBottom(16), viewMode === "dynamic" && ai(Aligns.CENTER)]}>
            <Typography
              ref={useTitleWidthCalculation ? calculateWidth(key) : null}
              styles={[
                maxWidth(192),
                flexShrink(0),
                marginRight(16),
                textAlign("right"),
                forceWidth && width(forceWidth),
                forceTitleWidth && width(forceTitleWidth),
              ]}
              color="gray-blue/05"
            >
              {field.title}
            </Typography>
            <FieldItemElementRenderer type={field.type} options={field.options} styles={maxWidth(800)} />
          </Wrapper>
        );
      })}
    </Wrapper>
  );
}

export default React.memo(HorizontalFieldsList);
