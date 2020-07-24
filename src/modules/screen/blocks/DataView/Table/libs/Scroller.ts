import { observable } from "mobx";

import { htmlCollectionToArray } from "libs/htmlCollectionToArray";

export class Scroller {
  private container!: HTMLElement;

  @observable
  showOriginal = true;

  @observable
  showSticky = false;

  run(container: HTMLElement) {
    this.container = container;
    // const [originalHeader] = (container.getElementsByClassName("table-header-original") as unknown) as HTMLElement[];
    const [stickyTable] = (container.getElementsByClassName("table-sticky-for-header") as unknown) as HTMLElement[];
    // const [stickyHeader] = (stickyTable.getElementsByClassName("header-sticky") as unknown) as HTMLElement[];
    stickyTable.style.display = "none";
    // container.addEventListener("scroll", () => {
    //   if (container.scrollTop === 0) {
    //     originalHeader.style.opacity = "1";
    //     stickyTable.style.display = "none";
    //     this.showOriginal = true;
    //     this.showSticky = false;
    //     return;
    //   }
    //   this.showOriginal = false;
    //   this.showSticky = true;
    //   originalHeader.style.opacity = "0";
    //   stickyTable.style.display = "block";
    //   stickyTable.style.top = container.scrollTop + "px";
    //   htmlCollectionToArray(originalHeader.children[0].children).forEach((el, index) => {
    //     (stickyHeader.children[0].children[index] as HTMLElement).style.width = el.getBoundingClientRect().width + "px";
    //   });
    // });
  }

  destroy() {}
}
