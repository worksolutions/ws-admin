import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Icon from "primitives/Icon";
import Hint from "primitives/Popper/Hint";

import {
  ai,
  Aligns,
  child,
  firstChild,
  flex,
  flexColumn,
  flexShrink,
  flexValue,
  flexWrap,
  jc,
  lastChild,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  maxWidth,
  minHeight,
  minWidth,
  overflow,
  width,
} from "libs/styles";

import { useForceWidthStyles } from "../hooks";

import { FieldListComponentInterface } from "./types";
import FieldItemElementRenderer from "./Elements";

function VerticalFieldsList({
  options,
  forceTitleWidth,
  useTitleWidthCalculation,
  onCalculateTitleWidth,
  styles,
}: FieldListComponentInterface) {
  const { forceWidth, widthRefs } = useForceWidthStyles(onCalculateTitleWidth);

  const calculateWidth = (index: number) => (ref: HTMLElement) => {
    if (!ref) return;
    widthRefs.current[index] = ref.getBoundingClientRect().width;
  };

  return (
    <Wrapper styles={[flex, flexColumn, marginTop(16), lastChild(marginBottom(0)), styles]}>
      {options!.fields.map((field, key) => {
        const titleElement = field.title && (
          <Wrapper
            ref={useTitleWidthCalculation ? calculateWidth(key) : null}
            styles={[
              maxWidth(192),
              flexShrink(0),
              marginRight(16),
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
        );

        return (
          <Wrapper key={key} styles={[flex, marginBottom(16), ai(Aligns.STRETCH)]}>
            {titleElement}
            <Wrapper
              styles={[
                maxWidth(800),
                flexValue(1),
                flex,
                flexWrap,
                firstChild([marginRight(16)]),
                child([minHeight(38), overflow("hidden")], ".modifier"),
              ]}
            >
              <FieldItemElementRenderer type={field.type} options={field.options} />
            </Wrapper>
          </Wrapper>
        );
      })}
    </Wrapper>
  );
}

export default React.memo(VerticalFieldsList);
