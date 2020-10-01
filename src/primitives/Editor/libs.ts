export function insertDivElementBeforeEditorToolbarSeparator() {
  const elements = document.getElementsByClassName("ck-toolbar__separator");
  if (elements.length === 0) return null;

  const lastElement = elements[elements.length - 1] as HTMLElement;
  const div = document.createElement("div");
  lastElement.parentNode!.insertBefore(div, lastElement);
  return div;
}

export function insertDivElementAtTheEndOfEditorToolbar() {
  const toolbarElement = document.querySelector(".ck-toolbar__items");
  return toolbarElement ? (toolbarElement as HTMLElement) : null;
}

function removeResetClasses() {
  const elements = document.getElementsByClassName("ck-reset_all");
  if (elements.length === 0) return null;

  Array.from(elements).forEach((element) => element.classList.remove("ck-reset_all"));
}

export function prepareEditorToCustomize() {
  removeResetClasses();
}
