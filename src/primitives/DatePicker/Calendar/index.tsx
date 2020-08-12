import React from "react";
import { elevation16 } from "style/shadows";
import { Placement } from "@popperjs/core";
import moment, { Moment } from "moment";
import { range } from "ramda";

import Wrapper from "primitives/Wrapper";
import { getPopperMarginStyleForPlacement } from "primitives/Popper/usePopper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import {
  ai,
  Aligns,
  backgroundColor,
  border,
  borderRadius,
  flex,
  flexColumn,
  flexValue,
  jc,
  marginBottom,
  marginRight,
  marginTop,
  opacity,
  padding,
  visibility,
  width,
} from "libs/styles";
import { useEffectSkipFirst } from "libs/hooks/common";
import { today } from "libs/date";

import ButtonsList from "./ButtonsList";
import { SwitchModeButton } from "./SwitchModeButton";
import { useMonthCalculation } from "./libs";
import CalendarView from "./CalendarView";

interface CalendarInterface {
  min: Moment;
  max: Moment;
  value: string | null;
  placement: Placement;
  momentFormat: string;
  hasCurrentDayButton?: boolean;
  onChange: (value: string) => void;
}

type ViewMode = "year" | "month" | "date";

function Calendar({ min, max, placement, value, momentFormat, hasCurrentDayButton, onChange }: CalendarInterface) {
  const years = React.useMemo(() => range(min.year(), max.year() + 1), []);

  function calculateMomentValueFromIncomeValue() {
    return value ? moment(value, momentFormat) : moment();
  }

  const [innerMomentValue, setInnerMomentValue] = React.useState(calculateMomentValueFromIncomeValue);
  const selectedMomentValue = React.useMemo(() => (value ? moment(value, momentFormat) : null), [value]);

  useEffectSkipFirst(() => {
    setInnerMomentValue(calculateMomentValueFromIncomeValue);
  }, [value]);

  const year = React.useMemo(() => innerMomentValue.year(), [innerMomentValue]);
  const month = React.useMemo(() => innerMomentValue.month(), [innerMomentValue]);

  const months = useMonthCalculation(year, min, max);

  const [mode, setMode] = React.useState<ViewMode>("date");

  function toggleMode(newMode: ViewMode) {
    if (newMode === mode) {
      setMode("date");
      return;
    }
    setMode(newMode);
  }

  const leftRightButtonCommonStyles = mode !== "date" && [opacity(0), visibility("hidden")];

  return (
    <Wrapper
      styles={[
        width(306),
        getPopperMarginStyleForPlacement(placement, 4),
        padding(12),
        backgroundColor("white"),
        border(1, "gray-blue/02"),
        elevation16,
        borderRadius(6),
        flex,
        flexColumn,
      ]}
    >
      <Wrapper styles={[flex, flexValue(1), ai(Aligns.CENTER), marginBottom(12)]}>
        <Button
          styles={[marginRight(8), leftRightButtonCommonStyles]}
          type={ButtonType.ICON}
          size={ButtonSize.MEDIUM}
          iconLeft="arrow-left-long"
          onClick={() => setInnerMomentValue(moment(innerMomentValue).subtract(1, "month"))}
        />
        <SwitchModeButton
          styles={marginRight(8)}
          opened={mode === "month"}
          onClick={() => toggleMode("month")}
          value={months[month]!}
          width={108}
        />
        <SwitchModeButton
          styles={marginRight(8)}
          opened={mode === "year"}
          onClick={() => toggleMode("year")}
          value={year}
          width={84}
        />
        <Button
          styles={leftRightButtonCommonStyles}
          type={ButtonType.ICON}
          size={ButtonSize.MEDIUM}
          iconLeft="arrow-right-long"
          onClick={() => setInnerMomentValue(moment(innerMomentValue).add(1, "month"))}
        />
      </Wrapper>
      {mode === "date" && (
        <CalendarView
          currentInnerValue={innerMomentValue}
          selectedValue={selectedMomentValue}
          onChange={(day) => onChange(moment(innerMomentValue).date(day).format(momentFormat))}
        />
      )}
      {mode === "month" && (
        <ButtonsList
          items={months}
          selectedItemIndex={month}
          onClick={(month) => {
            setInnerMomentValue(moment(innerMomentValue).month(month));
            toggleMode("date");
          }}
        />
      )}
      {mode === "year" && (
        <ButtonsList
          items={years}
          selectedItemIndex={years.indexOf(year)}
          onClick={(index) => {
            setInnerMomentValue(moment(innerMomentValue).year(years[index]));
            toggleMode("date");
          }}
        />
      )}
      {hasCurrentDayButton && (
        <Wrapper styles={[flex, jc(Aligns.CENTER)]}>
          <Button
            styles={marginTop(4)}
            size={ButtonSize.MEDIUM}
            type={ButtonType.GHOST}
            onClick={() => onChange(today.format(momentFormat))}
          >
            Сегодня {today.format(momentFormat)}
          </Button>
        </Wrapper>
      )}
    </Wrapper>
  );
}

export default React.memo(Calendar);
