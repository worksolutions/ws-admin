import React from "react";
import moment, { Moment } from "moment";

export function useSelectedDays(currentInnerValue: Moment, selectedValue: Moment | null, days: (number | null)[]) {
  return React.useMemo(() => {
    if (!currentInnerValue) return days.fill(null);
    return days.map((day) => (day ? moment(currentInnerValue).date(day).isSame(selectedValue, "date") : null));
  }, [days, currentInnerValue]);
}

export function useHolyDays(currentInnerValue: Moment, days: (number | null)[]) {
  return React.useMemo(() => {
    if (!currentInnerValue) return days.fill(null);
    return days.map((day) => {
      if (!day) return null;
      const weekday = moment(currentInnerValue).date(day).weekday();
      return weekday === 5 || weekday === 6;
    });
  }, [days, currentInnerValue]);
}
