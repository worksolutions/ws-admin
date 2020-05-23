function insertContextData(text: string, context: any): string {
  return text.replace(/{{(.+?)}}/gm, (match, p1) =>
    context.hasOwnProperty(p1) ? context[p1] : match,
  );
}
export function insertContext(data: any, context) {
  if (typeof data === "object") {
    return JSON.parse(insertContextData(JSON.stringify(data), context));
  }
  if (typeof data === "string") {
    return insertContextData(data, context);
  }
  return data;
}
