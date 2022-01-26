export const makeToolbarElement = (editor: any, content: string, onClick: () => void) => {
  const button = document.createElement("span");
  button.classList.add("ck");
  button.classList.add("ck-button");

  button.innerHTML = content;
  editor.ui.view.toolbar.itemsView.element.insertAdjacentElement("beforeend", button);
  button.addEventListener("click", onClick);
};
