import React from "react";
import { observer } from "mobx-react-lite";
import { duration200 } from "layout/durations";
import { zIndex_filterPanel } from "layout/zIndexes";
import { elevation32 } from "style/shadows";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import HandleClickOutside from "primitives/HandleClickOutside";

import {
  ai,
  Aligns,
  backgroundColor,
  border,
  borderRadius,
  child,
  flex,
  flexValue,
  jc,
  padding,
  position,
  transform,
  transition,
} from "libs/styles";
import { useBoolean } from "libs/hooks/common";

import DynamicFieldsList from "modules/screen/blocks/RowFields/FieldsList/DynamicFieldsList";
import { FieldListItemInterface, FieldListItemMode } from "modules/screen/blocks/RowFields/FieldsList/types";

import FilterItem from "./Item";
import DroppedMenuWrapper from "./DroppedMenuWrapper";

import { BlockInterface } from "state/globalState";

function FilterBlock({
  styles,
  options,
}: BlockInterface<{ name: string; fields: FieldListItemInterface[] }[]> & { styles?: any }) {
  const [opened, open, close] = useBoolean(false);
  const [selectedFilterIndex, setSelectedFilterIndex] = React.useState(0);

  return (
    <HandleClickOutside enabled={opened} onClickOutside={close}>
      {(ref) => (
        <Wrapper
          ref={ref}
          styles={[
            zIndex_filterPanel,
            padding(8),
            backgroundColor("gray-blue/01"),
            jc(Aligns.SPACE_BETWEEN),
            transition(`border-radius ${duration200}, box-shadow ${duration200}`),
            borderRadius(8),
            opened && elevation32,
            border(1, "gray-blue/02"),
            position("relative"),
            flex,
            ai(Aligns.END),
            styles,
          ]}
        >
          <Wrapper styles={[flexValue(1)]}>
            {options!.map((filterItem, key) => (
              <FilterItem
                key={key}
                name={filterItem.name}
                selected
                applied={false}
                onClick={() => setSelectedFilterIndex(key)}
              />
            ))}
          </Wrapper>
          <Button
            type={ButtonType.ICON}
            size={ButtonSize.MEDIUM}
            iconLeft="arrow-down"
            styles={[
              child([transition(`transform ${duration200}`), transform(`rotateZ(${opened ? 180 : 0}deg)`)], "svg"),
            ]}
            onClick={opened ? close : open}
          />
          <DroppedMenuWrapper opened={opened}>
            <DynamicFieldsList
              useTitleWidthCalculation
              options={{ mode: FieldListItemMode.HORIZONTAL, fields: options![selectedFilterIndex].fields }}
            />
          </DroppedMenuWrapper>
        </Wrapper>
      )}
    </HandleClickOutside>
  );
}

export default React.memo(observer(FilterBlock));
