const NESTED_EDITABLE_FOCUSED = "ck-editor__nested-editable_focused";
const EDITABLE = "ck-editor__editable";
const NESTED_FOCUSED = "ck-editor__nested-editable";
export function toWidgetEditable(editable: any, writer: any) {
  writer.addClass([EDITABLE, NESTED_FOCUSED], editable);
  writer.setAttribute("contenteditable", String(!editable.isReadOnly), editable);

  editable.on("change:isReadOnly", (evt: any, property: any, is: any) =>
    writer.setAttribute("contenteditable", String(!is), editable),
  );

  editable.on("change:isFocused", (evt: any, property: any, is: any) => {
    if (is) {
      writer.addClass(NESTED_EDITABLE_FOCUSED, editable);
      return;
    }

    writer.removeClass(NESTED_EDITABLE_FOCUSED, editable);
  });

  return editable;
}
