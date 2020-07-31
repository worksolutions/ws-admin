import { zIndex } from "./index";

export const formattedDataViewZIndexes = {
  spinner: zIndex(3),
  actionsPanel: zIndex(100),
};

export const tableZIndexes = {
  cell: zIndex(-1),
  resizeLine: zIndex(1),
  thead: zIndex(1),
};

export const componentZIndexes = {
  sortingButtonsOnFocus: zIndex(1),
};

export const primitiveZIndexes = {
  droppedListWrapper: zIndex(100),
  hint: zIndex(2),
};

export const layoutZIndexes = {
  menuSidebar: zIndex(1),
};
