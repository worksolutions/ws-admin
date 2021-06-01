const documentPlaceholders = new WeakMap();
const DATA_PLACEHOLDER = "data-placeholder";
const CK_PLACEHOLDER = "ck-placeholder";

export function enablePlaceholder({ view, element, text, isDirectHost = true, keepOnFocus = false }: any) {
  const doc = view.document;

  if (!documentPlaceholders.has(doc)) {
    documentPlaceholders.set(doc, new Map());

    doc.registerPostFixer((writer: any) => updateDocumentPlaceholders(doc, writer));
  }

  documentPlaceholders.get(doc).set(element, {
    text,
    isDirectHost,
    keepOnFocus,
    hostElement: isDirectHost ? element : null,
  });

  view.change((writer: any) => updateDocumentPlaceholders(doc, writer));
}

export function disablePlaceholder(view: any, element: any) {
  const doc = element.document;

  view.change((writer: any) => {
    if (!documentPlaceholders.has(doc)) return;

    const placeholders = documentPlaceholders.get(doc);
    const config = placeholders.get(element);

    writer.removeAttribute(DATA_PLACEHOLDER, config.hostElement);
    hidePlaceholder(writer, config.hostElement);

    placeholders.delete(element);
  });
}

export function showPlaceholder(writer: any, element: any) {
  if (!element.hasClass(CK_PLACEHOLDER)) {
    writer.addClass(CK_PLACEHOLDER, element);
    return true;
  }

  return false;
}

export function hidePlaceholder(writer: any, element: any) {
  if (element.hasClass(CK_PLACEHOLDER)) {
    writer.removeClass(CK_PLACEHOLDER, element);
    return true;
  }

  return false;
}

export function needsPlaceholder(element: any, keepOnFocus: any) {
  if (!element.isAttached()) return false;

  const hasContent = Array.from(element.getChildren())
    // @ts-ignore
    .some((element) => !element.is("uiElement"));

  if (hasContent) return false;
  if (keepOnFocus) return true;

  const doc = element.document;

  if (!doc.isFocused) return true;

  const viewSelection = doc.selection;
  const selectionAnchor = viewSelection.anchor;

  return selectionAnchor && selectionAnchor.parent !== element;
}

function updateDocumentPlaceholders(doc: any, writer: any) {
  const placeholders = documentPlaceholders.get(doc);
  const directHostElements: any[] = [];
  let wasViewModified = false;

  Array.from(placeholders).forEach(([element, config]: any) => {
    if (!config.isDirectHost) return;
    directHostElements.push(element);

    if (updatePlaceholder(writer, element, config)) wasViewModified = true;
  });

  Array.from(placeholders).forEach(([element, config]: any) => {
    if (config.isDirectHost) return;

    const hostElement = getChildPlaceholderHostSubstitute(element);

    if (!hostElement) return;

    if (directHostElements.includes(hostElement)) return;

    config.hostElement = hostElement;

    if (updatePlaceholder(writer, element, config)) wasViewModified = true;
  });

  return wasViewModified;
}

function updatePlaceholder(writer: any, element: any, config: any) {
  const { text, isDirectHost, hostElement } = config;

  let wasViewModified = false;

  if (hostElement.getAttribute(DATA_PLACEHOLDER) !== text) {
    writer.setAttribute(DATA_PLACEHOLDER, text, hostElement);
    wasViewModified = true;
  }

  const isOnlyChild = isDirectHost || element.childCount == 1;

  if (isOnlyChild && needsPlaceholder(hostElement, config.keepOnFocus)) {
    if (showPlaceholder(writer, hostElement)) wasViewModified = true;
  } else if (hidePlaceholder(writer, hostElement)) {
    wasViewModified = true;
  }

  return wasViewModified;
}

function getChildPlaceholderHostSubstitute(parent: any) {
  if (!parent.childCount) return null;

  const firstChild = parent.getChild(0);
  if (firstChild.is("element") && !firstChild.is("uiElement")) return firstChild;
}
