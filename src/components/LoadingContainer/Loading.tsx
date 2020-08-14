import React from "react";
import { observer } from "mobx-react-lite";

import { ProviderLogic, providerLogicStore } from "./LoadingProviderLogic";

function getElementWithAttributeInParentsPath(element: HTMLElement, attribute: string): HTMLElement | null {
  if (!element.parentElement) return null;
  if (element.getAttribute(attribute)) return element;
  return getElementWithAttributeInParentsPath(element.parentElement, attribute);
}

function findProviderContainerId(element: HTMLElement) {
  const providerElement = getElementWithAttributeInParentsPath(element, ProviderLogic.attributeName);
  if (!providerElement) return;
  return providerElement.getAttribute(ProviderLogic.attributeName);
}

function Loading() {
  const ref = React.useRef<HTMLElement>();
  React.useEffect(() => {
    let foundElementId: string | null | undefined;
    setTimeout(() => {
      if (!ref.current) return;
      foundElementId = findProviderContainerId(ref.current);
      if (!foundElementId) return;
      providerLogicStore.providers[foundElementId].spinnerCount++;
    }, 16);

    return () => {
      if (!foundElementId) return;
      setTimeout(() => {
        providerLogicStore.providers[foundElementId!].spinnerCount--;
      }, 16);
    };
  }, []);

  return <span ref={ref as any} />;
}

export default observer(Loading);
