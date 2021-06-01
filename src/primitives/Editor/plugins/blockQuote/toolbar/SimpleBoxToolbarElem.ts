const svg = `
          <svg width="24" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8672 1.824L7.26431 24L0.5271 21.696L10.9957 0L15.8672 1.824ZM31 1.824L22.6044 24L15.6599 21.696L26.1285 0L31 1.824Z" fill="#A3B3CC"/>
          </svg>
          `;

export class SimpleBoxToolbarElem {
  constructor(private readonly editor: any) {}

  execute() {
    const button = document.createElement("span");
    button.classList.add("ck");
    button.classList.add("ck-button");

    button.innerHTML = svg;
    this.editor.ui.view.toolbar.itemsView.element.insertAdjacentElement("beforeend", button);
    button.addEventListener("click", () => this.editor.execute("insertBlockQuote"));
  }
}
