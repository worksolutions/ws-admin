import { DataSourceInterface, DataSourceType } from "../DataSourceHOC";
import { createRequest, METHODS } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

function insertContextData(text: string, context: any): string {
  return text.replace(/{{(.+?)}}/gm, (match, p1) =>
    context.hasOwnProperty(p1) ? context[p1] : match,
  );
}
function insertContext(data: any, context) {
  if (typeof data === "object") {
    return JSON.parse(insertContextData(JSON.stringify(data), context));
  }
  if (typeof data === "string") {
    return insertContextData(data, context);
  }
  return data;
}

export default function (
  dataSource: DataSourceInterface<DataSourceType.API_REQUEST>,
  state: any,
): Promise<any> {
  const { method = METHODS.GET, params, url } = dataSource.options;
  return createRequest(
    url,
    method,
    identityValueDecoder,
  )({ body: insertContext(params, state) });
}
