export const WIDGET_CLASS_NAME = "ck-widget";
const SELECTION_HANDLE_CLASS = "ck-widget__selection-handle";

export function toWidget(element: any, writer: any, options: any = {}) {
  if (!element.is("containerElement")) return;

  writer.setAttribute("contenteditable", "false", element);

  writer.addClass(WIDGET_CLASS_NAME, element);
  writer.setCustomProperty("widget", true, element);
  element.getFillerOffset = () => null;

  if (options.label) setLabel(element, options.label, writer);

  if (options.hasSelectionHandle) addSelectionHandle(element, writer);

  return element;
}
export function setLabel(element: any, labelOrCreator: any, writer: any) {
  writer.setCustomProperty("widgetLabel", labelOrCreator, element);
}

function addSelectionHandle(widgetElement: any, writer: any) {
  const selectionHandle = writer.createUIElement("div", { class: "ck " + SELECTION_HANDLE_CLASS }, function (
    domDocument: any,
  ) {
    //@ts-ignore
    return this.toDomElement(domDocument);
  });

  writer.insert(writer.createPositionAt(widgetElement, 0), selectionHandle);
  writer.addClass([SELECTION_HANDLE_CLASS], widgetElement);
}
