import moment from "moment";

import { DateMode } from "libs/date";

import { METHODS, RequestConfigInterface, RequestOptions } from "./index";

const enableLogger =
  process.env.NODE_ENV === "development" &&
  localStorage.getItem("log_requests") === "1";

// eslint-disable-next-line max-params
export function logRequestStart(
  url: string,
  method: METHODS,
  requestConfig: RequestConfigInterface,
  requestOptions: RequestOptions,
) {
  if (!enableLogger) return;
  console.groupCollapsed(`Request: ${method.toUpperCase()} ${url}`);
  console.log(moment().format(DateMode.DATE_TIME_WITH_MILLI_SECONDS));
  console.log(`body: `, requestOptions.body);
  console.log(`options: `, requestOptions);
  console.log(`config: `, requestConfig);
  console.groupCollapsed(`trace`);
  console.trace();
  console.groupEnd();
}

export function logRequestEndSuccess(result) {
  if (!enableLogger) return;
  console.log(`result: `, result);
  console.groupEnd();
}

export function logRequestEndError(err) {
  if (!enableLogger) return;
  console.log(`error: `, err);
  console.groupEnd();
}

export function errorLogger(requestData: object, error: string) {
  console.log("---------------------------");
  console.log("Error when parsing response");
  console.log("Request info", requestData);
  console.log("Original error:");
  console.log(error);
  console.log();
  console.log("Parsed error:");
  try {
    error.split("I found an error").forEach((val) => {
      const ofIndex = val.indexOf("of");
      if (ofIndex === -1) {
        console.log(val);
        return;
      }
      const startObjectPosition = ofIndex + 2;
      const endObjectPosition = val.lastIndexOf("}") + 1;
      console.log(val.slice(0, startObjectPosition), ": ");
      console.log(
        JSON.parse(val.slice(startObjectPosition, endObjectPosition)),
      );
      console.log(val.slice(endObjectPosition));
    });
  } catch (err) {
    console.log("exception when error parsing:", err);
  }
  console.log("---------------------------\n\n\n");
}
