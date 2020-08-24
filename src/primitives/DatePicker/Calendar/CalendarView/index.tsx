import React from "react";
import { isNil, range } from "ramda";
import moment, { Moment } from "moment";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import { ai, alignContent, Aligns, child, flex, flexWrap, fullWidth, height, jc, width } from "libs/styles";
import { today } from "libs/date";

import { allWeekDays } from "../libs";

import CalendarItem from "./CalendarItem";
import { useHolyDays, useSelectedDays } from "./hooks";

interface CalendarViewInterface {
  selectedValue: Moment | null;
  currentInnerValue: Moment;
  onChange: (day: number) => void;
}

function getDaysRange(value: Moment) {
  const firstDayInMonthWeekday = moment(value).date(1).weekday();
  const emptyDaysToFillFirstWeek: null[] = (range(0, firstDayInMonthWeekday) as any).fill(null!);
  return [...emptyDaysToFillFirstWeek, ...range(1, value.daysInMonth() + 1)];
}

function CalendarView({ currentInnerValue, selectedValue, onChange }: CalendarViewInterface) {
  const days = React.useMemo(() => getDaysRange(currentInnerValue), [currentInnerValue]);

  const selectedDays = useSelectedDays(currentInnerValue, selectedValue, days);

  const holidays = useHolyDays(currentInnerValue, days);

  return (
    <Wrapper
      styles={[
        fullWidth,
        flex,
        flexWrap,
        alignContent(Aligns.START),
        child([width(40), flex, ai(Aligns.CENTER), jc(Aligns.CENTER)]),
        child([height(24)], ".weekDay"),
        child([height(40)], ".day"),
        flex,
        flexWrap,
      ]}
    >
      {allWeekDays.map((day) => (
        <Wrapper key={day} className="weekDay">
          <Typography type="caption-semi-bold" color="gray-blue/03">
            {day}
          </Typography>
        </Wrapper>
      ))}
      {days.map((day, index) =>
        isNil(day) ? (
          <CalendarItem key={index} />
        ) : (
          <CalendarItem
            key={index}
            value={day}
            selected={!!selectedDays[index]}
            holiday={!!holidays[index]}
            isToday={today.isSame(currentInnerValue, "month") && today.date() === day}
            onClick={() => onChange(day)}
          />
        ),
      )}
    </Wrapper>
  );
}

export default React.memo(CalendarView);
