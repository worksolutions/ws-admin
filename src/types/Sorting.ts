export enum SortingDirection {
  ASC = "asc",
  DESC = "desc",
}

export type SortingID = string | number;

export type SortingItem = { id: SortingID; title: string; hasDirection: boolean };
