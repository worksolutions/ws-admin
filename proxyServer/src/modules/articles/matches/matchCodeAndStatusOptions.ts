import { DRAFT, NUMBERS_FOR_STATUSES, PUBLISHED, UNPUBLISHED } from "modules/articles/matches/matchStatusAndCode";

export default {
  [NUMBERS_FOR_STATUSES[DRAFT]]: { hint: "Черновик", badgeColor: "gray-blue/05" },
  [NUMBERS_FOR_STATUSES[PUBLISHED]]: { hint: "Опубликовано", badgeColor: "green/05" },
  [NUMBERS_FOR_STATUSES[UNPUBLISHED]]: { hint: "Не опубликовано", badgeColor: "orange/05" },
};
