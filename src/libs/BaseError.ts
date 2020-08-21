import { field, keyValuePairs, string, succeed } from "jsonous";
import { fromPairs } from "ramda";

interface ErrorInterface {
  message: string;
  errors: Record<string, string>;
}

const errorDecoder = succeed({})
  .assign("message", field("message", string))
  .assign(
    "errors",
    field(
      "errors",
      keyValuePairs(string).map((pairs) => fromPairs(pairs)),
    ),
  );

export class BaseError {
  error: ErrorInterface;

  constructor(error: any) {
    this.error = errorDecoder
      .decodeAny(error)
      .getOrElseValue({ message: "Не удалось определить формат ошибки", errors: {} });
  }

  hasAnyErrors() {
    return Object.keys(this.error.errors).length !== 0;
  }

  getErrors() {
    return this.error.errors;
  }

  getMessage() {
    return this.error.message;
  }
}
