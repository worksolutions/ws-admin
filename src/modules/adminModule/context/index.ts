import { hasPath, path } from "ramda";

function insertContextData(text: string, context: object): string {
  return text.replace(/{{(.+?)}}/gm, (match, p1) => {
    const arrPath = p1.split(".");
    console.log(context);
    console.log(arrPath);
    console.log(path(arrPath, context));
    return hasPath(arrPath, context) ? path(arrPath, context) : match;
  });
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
