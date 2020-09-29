import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  ai,
  Aligns,
  backgroundColor,
  flex,
  flexColumn,
  flexValue,
  height,
  horizontalPadding,
  lastChild,
  marginBottom,
  marginLeft,
  marginTop,
} from "libs/styles";

import FieldList from "./FieldsList";
import { useForceWidthStyles } from "./hooks";
import { FieldListComponentViewMode, FieldListInterface } from "./FieldsList/types";

import { BlockInterface } from "state/globalState";

export type GroupedFieldsListInterface = BlockInterface<{ title: string; fieldList: FieldListInterface }[]>;

function GroupedFieldsList({
  options,
  viewMode,
}: GroupedFieldsListInterface & { viewMode: FieldListComponentViewMode }) {
  const { forceWidth, widthRefs } = useForceWidthStyles();

  const calculateWidth = (index: number) => (width: number) => {
    widthRefs.current[index] = width;
  };

  return (
    <Wrapper styles={[flex, flexColumn, lastChild(marginBottom(24))]}>
      {options!.map((group, key) => (
        <Wrapper key={key} styles={[flex, flexColumn, marginTop(24), marginBottom(8)]}>
          <Wrapper styles={[flex, ai(Aligns.CENTER), flexValue(1), horizontalPadding(20)]}>
            <Typography type="h2-bold">{group.title}</Typography>
            <Wrapper
              styles={[flexValue(1), marginLeft(20), height(1), backgroundColor("gray-blue/02"), marginTop(2)]}
            />
          </Wrapper>
          <FieldList
            viewMode={viewMode}
            useTitleWidthCalculation
            styles={horizontalPadding(20)}
            forceTitleWidth={forceWidth}
            options={group.fieldList}
            onCalculateTitleWidth={calculateWidth(key)}
          />
        </Wrapper>
      ))}
    </Wrapper>
  );
}

export default React.memo(GroupedFieldsList);
