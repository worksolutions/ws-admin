import React from "react";
import { observer } from "mobx-react-lite";
import { duration160 } from "layout/durations";
import { elevation32 } from "style/shadows";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import HandleClickOutside from "primitives/HandleClickOutside";
import Spinner from "primitives/Spinner";

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
  marginTop,
  padding,
  paddingTop,
  position,
  transform,
  transition,
  zIndex,
} from "libs/styles";
import { useBoolean, useEffectSkipFirst } from "libs/hooks/common";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { dataSourceValueWasChanged, useDataSource } from "modules/context/dataSource/useDataSource";
import FieldsList from "modules/screen/blocks/RowFields/FieldsList";
import { FieldListItemInterface, FieldListItemMode } from "modules/screen/blocks/RowFields/FieldsList/types";

import AlignContainerFieldsList from "../RowFields/FieldsList/AlignContainerFieldsList";

import FilterItem from "./Item";
import DroppedMenuWrapper from "./DroppedMenuWrapper";

import { BlockInterface } from "state/globalState";

function FilterBlock({
  styles,
  options,
  dataSource,
  actions,
}: BlockInterface<{ name: string; fields: FieldListItemInterface[] }[], "clear"> & { styles?: any }) {
  const [opened, open, close] = useBoolean(false);
  const [selectedFilterIndex, setSelectedFilterIndex] = React.useState(-1);
  const { data, initialData, loadingContainer } = useDataSource(dataSource!);
  const resultActions = useActions(actions!, useAppContext());

  useEffectSkipFirst(() => {
    if (selectedFilterIndex === -1) {
      setSelectedFilterIndex(0);
      return;
    }
    if (!opened) setSelectedFilterIndex(-1);
  }, [opened]);

  if (loadingContainer.loading) return <Spinner />;

  const filterIsApplied = dataSourceValueWasChanged(data, initialData);

  return (
    <HandleClickOutside enabled={opened} onClickOutside={close}>
      {(ref) => (
        <Wrapper
          ref={ref}
          styles={[
            zIndex(2),
            padding(8),
            backgroundColor("gray-blue/01"),
            jc(Aligns.SPACE_BETWEEN),
            transition(`border-radius ${duration160}, box-shadow ${duration160}`),
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
                selected={selectedFilterIndex === key}
                applied={filterIsApplied}
                onClick={() => {
                  setSelectedFilterIndex(key);
                  open();
                }}
              />
            ))}
          </Wrapper>
          <Button
            type={ButtonType.ICON}
            size={ButtonSize.MEDIUM}
            iconLeft="arrow-down"
            styles={[
              child([transition(`transform ${duration160}`), transform(`rotateZ(${opened ? 180 : 0}deg)`)], "svg"),
            ]}
            onClick={opened ? close : open}
          />

          <DroppedMenuWrapper opened={opened}>
            <AlignContainerFieldsList
              useTitleWidthCalculation
              options={{
                mode: FieldListItemMode.VERTICAL,
                fields: selectedFilterIndex === -1 ? [] : options![selectedFilterIndex].fields,
              }}
              isEditable={false}
            />

            {resultActions.clear && filterIsApplied && (
              <Button
                styles={marginTop(16)}
                type={ButtonType.GHOST}
                size={ButtonSize.SMALL}
                iconLeft="cross-big"
                onClick={() => resultActions.clear.run(initialData)}
              >
                Сбросить фильтр
              </Button>
            )}
          </DroppedMenuWrapper>
        </Wrapper>
      )}
    </HandleClickOutside>
  );
}

export default React.memo(observer(FilterBlock));
