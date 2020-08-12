import React from "react";
import moment, { Moment } from "moment";

import { capitalizeFirstStringCharacter } from "libs/capitalizeFirstStringCharacter";

export const allMonths: string[] = moment.months().map(capitalizeFirstStringCharacter);

export const lastMonthIndex = allMonths.length - 1;

export const allWeekDays: string[] = moment.weekdaysShort().map(capitalizeFirstStringCharacter);

export function useMonthCalculation(year: number, min: Moment, max: Moment) {
  return React.useMemo(() => {
    const from = min.year() === year ? min.month() : 0;
    const to = max.year() === year ? max.month() : lastMonthIndex;
    return allMonths.map((month, index) => (index >= from && index <= to ? month : null));
  }, [year]);
}
