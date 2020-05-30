import { field, string, succeed } from "jsonous";

import { createRequest, METHODS } from "libs/request";

const mainConfigDecoder = succeed({}).assign("title", field("title", string));

export default function () {
  return createRequest("/api/admin/config", METHODS.GET, mainConfigDecoder)();
}
