import { createRequest, METHODS } from "../../libs/request";
import { identityValueDecoder } from "../../libs/request/defaultDecoders";

export function getMainConfig() {
  return createRequest(
    "/api/admin/config",
    METHODS.GET,
    identityValueDecoder,
  )();
}
