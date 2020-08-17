import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Icon from "primitives/Icon";
import Hint from "primitives/Popper/Hint";

import {
  ai,
  Aligns,
  flex,
  flexColumn,
  flexShrink,
  jc,
  lastChild,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  maxWidth,
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
          <Wrapper key={key} styles={[flex, marginBottom(16), viewMode === "static" && ai(Aligns.CENTER)]}>
            <Wrapper
              ref={useTitleWidthCalculation ? calculateWidth(key) : null}
              styles={[
                maxWidth(192),
                flexShrink(0),
                marginRight(16),
                viewMode === "dynamic" && marginTop(8),
                forceWidth && width(forceWidth),
                forceTitleWidth && width(forceTitleWidth),
              ]}
            >
              <Typography color="gray-blue/05" styles={[flex, ai(Aligns.CENTER), jc(Aligns.END)]}>
                {field.title}
                {field.required && (
                  <Typography color="gray-blue/05" styles={marginLeft(4)}>
                    *
                  </Typography>
                )}
                {field.hint && (
                  <Hint text={field.hint}>
                    {(ref) => (
                      <Icon
                        ref={ref}
                        color="gray-blue/05"
                        width={16}
                        height={16}
                        styles={marginLeft(4)}
                        icon="16-info-circle"
                      />
                    )}
                  </Hint>
                )}
              </Typography>
            </Wrapper>
            <FieldItemElementRenderer type={field.type} options={field.options} styles={maxWidth(800)} />
          </Wrapper>
        );
      })}
    </Wrapper>
  );
}

export default React.memo(HorizontalFieldsList);
