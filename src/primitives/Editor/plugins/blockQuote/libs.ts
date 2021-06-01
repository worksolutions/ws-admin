import { DATA_BLOCK_QUOTE_WRAPPER_TOP } from "./index";

export function isNotImage(elem: any) {
  if (!elem) return true;

  if (!elem.parent) return true;
  if (elem.parent.name !== "figure") return true;
  if (!elem.parent.parent.hasAttribute(DATA_BLOCK_QUOTE_WRAPPER_TOP)) return true;

  return false;
}

export function uploadFile(
  eventHandler: (e: Omit<HTMLElementEventMap["change"], "target"> & { target: HTMLInputElement }) => void,
) {
  const input = document.createElement("INPUT");
  input.setAttribute("type", "file");
  input.click();
  //@ts-ignore
  input.addEventListener("change", eventHandler);
}

export function getFile(element: HTMLInputElement) {
  if (!element) return;
  if (!element.files) return;

  return element.files[0];
}
