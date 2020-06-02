import "moment/locale/ru";
import moment, { LocaleSpecification, Moment, unitOfTime } from "moment";
import { sort, uniqWith } from "ramda";

// @ts-ignore
const config = moment.localeData("ru")["_config"] as LocaleSpecification;

moment.updateLocale("ru", {
  calendar: {
    ...config.calendar,
  },
});

export enum DateMode {
  DAY_MONTH_YEAR = "DD MMMM YYYY",
  DAY_MONTH_YEAR_TIME = "DD MMMM YYYY HH:mm",
  DAY_MONTH = "DD MMMM",
  DATE = "DD.MM.YYYY",
  TIME = "HH:mm",
  DATE_TIME = "DD.MM.YYYY HH:mm",
  DATE_TIME_WITH_SECONDS = "DD.MM.YYYY HH:mm:ss",
  DATE_TIME_WITH_MILLI_SECONDS = "DD.MM.YYYY HH:mm:ss:SSS",
  YEAR_AND_QUARTER = "YYYY.Q",
  SERVER_YEAR_AND_QUARTER = "YYYY~Q",
  HUMANABLE_DATE_TIME_WITHOUT_YEAR = "D MMMM в HH:mm",
}

export const sortDates = (dates: Moment[]): Moment[] => sort((a: Moment, b: Moment) => a.diff(b), dates);

export const uniqDatesBy = (by?: unitOfTime.StartOf) => (dates: Moment[]): Moment[] =>
  uniqWith((prevDate, currDate) => prevDate.isSame(currDate, by), dates);
