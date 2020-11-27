export const UNPUBLISHED = "unpublished";
export const PUBLISHED = "published";
export const DRAFT = "draft";
export const ANY = "any";

export const NUMBERS_FOR_STATUSES = {
  [DRAFT]: 0,
  [PUBLISHED]: 1,
  [UNPUBLISHED]: 2,
};

export const STATUSES_FOR_NUMBERS = {
  0: DRAFT,
  1: PUBLISHED,
  2: UNPUBLISHED,
};
