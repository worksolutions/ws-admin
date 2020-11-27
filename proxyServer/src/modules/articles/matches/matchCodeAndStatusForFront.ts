import matchCodeAndStatusOptions from "modules/articles/matches/matchCodeAndStatusOptions";
import { DRAFT, NUMBERS_FOR_STATUSES, PUBLISHED, UNPUBLISHED } from "modules/articles/matches/matchStatusAndCode";

export default {
  [NUMBERS_FOR_STATUSES[DRAFT]]: {
    icon: { color: matchCodeAndStatusOptions[NUMBERS_FOR_STATUSES[DRAFT]].badgeColor },
    value: "Черновик",
  },
  [NUMBERS_FOR_STATUSES[PUBLISHED]]: {
    icon: { color: matchCodeAndStatusOptions[NUMBERS_FOR_STATUSES[PUBLISHED]].badgeColor },
    value: "Опубликовано",
  },
  [NUMBERS_FOR_STATUSES[UNPUBLISHED]]: {
    icon: { color: matchCodeAndStatusOptions[NUMBERS_FOR_STATUSES[UNPUBLISHED]].badgeColor },
    value: "Не опубликовано",
  },
};
