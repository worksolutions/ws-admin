import { InputHTMLAttributes } from "react";
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
  attributes: InputHTMLAttributes<HTMLInputElement> = {},
) {
  const input = document.createElement("INPUT");
  input.setAttribute("type", "file");

  for (const attributesKey in attributes) {
    const attribute = attributesKey as keyof typeof attributes;

    input.setAttribute(attribute, attributes[attribute]);
  }

  input.click();
  input.addEventListener("change", eventHandler as any);
}

export function getFile(element: HTMLInputElement): File | null {
  if (!element) return null;
  if (!element.files) return null;

  return element.files[0];
}
