import { TableSizes } from "../types";

export const cellDefaultHorizontalPadding = 16;
export const halfOfCellDefaultHorizontalPadding = cellDefaultHorizontalPadding / 2;

export const cellVerticalPaddingBySize: Record<TableSizes, number> = {
  [TableSizes.LARGE]: 16,
  [TableSizes.MEDIUM]: 12,
  [TableSizes.SMALL]: 8,
};
