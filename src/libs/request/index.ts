import axios, {
  AxiosError,
  AxiosRequestConfig,
  CancelTokenSource,
} from "axios";
import Decoder from "jsonous";

import { errorLogger, logRequestEndSuccess, logRequestStart } from "./logger";

export enum METHODS {
  POST = "post",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export interface RequestConfigInterface {
  contentType?: string;
  isFile?: boolean;
}

interface OptionsInterface {
  urlParams?: { [name: string]: string };
  cancelName?: string;
  progressReceiver?: (progress: number) => void;
}

type RequestCancelledType = "request_cancelled";
export const REQUEST_CANCELLED: RequestCancelledType = "request_cancelled";

const cancellations: { [name: string]: CancelTokenSource } = {};

export class RequestError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public errors: Record<any, string> = {},
  ) {
    super(message);
  }
}

async function makeAndDecodeResponse(
  url: string,
  method: METHODS,
  body: any,
  { urlParams, cancelName, progressReceiver }: OptionsInterface,
  { contentType, isFile }: RequestConfigInterface,
) {
  try {
    const requestData: AxiosRequestConfig = {
      url,
      method,
    };

    if (cancelName) {
      const cancelForRequest = cancellations[cancelName];
      if (cancelForRequest) cancelForRequest.cancel(REQUEST_CANCELLED);
      cancellations[cancelName] = axios.CancelToken.source();
      requestData.cancelToken = cancellations[cancelName].token;
    }

    requestData.headers = { accept: "application/json" };

    if (contentType) {
      requestData.headers = {
        ...requestData.headers,
        "content-type": contentType,
      };
    }

    if (isFile) {
      const formData = new FormData();
      for (const field in body) {
        const value = body[field];
        if (Array.isArray(value)) {
          value.forEach((subField) => {
            formData.append(`${field}[]`, subField);
          });
          continue;
        }
        formData.append(field, value);
      }
      body = formData;
    }

    requestData[method === METHODS.GET ? "params" : "data"] = body;

    if (urlParams) {
      for (const i in urlParams) {
        // @ts-ignore
        requestData.url = requestData.url.replace(`{${i}}`, urlParams[i]);
      }
    }

    if (progressReceiver) {
      requestData.onUploadProgress = function ({ loaded, total }) {
        progressReceiver(loaded / total);
      };
    }

    const { data } = await axios(requestData);

    if (cancelName && cancellations[cancelName]) {
      delete cancellations[cancelName];
    }

    return [data, null];
  } catch (axiosError) {
    if (axiosError.message === REQUEST_CANCELLED) {
      return [null, REQUEST_CANCELLED];
    }

    if (!axiosError.response) {
      return [null, new RequestError("Ошибка запроса", 0)];
    }

    const {
      response: { data, status },
    }: AxiosError = axiosError;
    if (!data)
      return [null, new RequestError("Не удалось получить ошибку", status)];

    const errorMessage =
      data.message || (data.errors && data.errors.length ? data.errors[0] : "");

    return [null, new RequestError(errorMessage, status, data.errors)];
  }
}

async function makeRequest<T>(
  url: string,
  method: METHODS,
  body: any,
  options: OptionsInterface,
  requestConfig: RequestConfigInterface,
  serverDataDecoder: Decoder<T>,
): Promise<T | void> {
  const [result, error] = await makeAndDecodeResponse(
    url,
    method,
    body,
    options,
    requestConfig,
  );

  if (error) throw error;

  if (!serverDataDecoder) return;

  const [data, decoderError] = serverDataDecoder
    .decodeAny(result && result.data)
    .cata<[T, any]>({
      Ok: (val) => [val, null],
      Err: (err) => [null, err],
    });

  if (decoderError) {
    errorLogger(
      {
        url,
        method,
        body,
        options,
      },
      decoderError,
    );
    throw new RequestError(
      `Не удалось произвести парсинг ответа: ${decoderError}`,
      0,
    );
  }

  return data;
}

export interface RequestOptions {
  body?: any;
  options?: OptionsInterface;
}

export function createRequest<DecoderGenericType>(
  url: string,
  method: METHODS,
  serverDataDecoder?: Decoder<DecoderGenericType>,
  requestConfig?: RequestConfigInterface,
): (data?: RequestOptions) => Promise<DecoderGenericType>;

export function createRequest<DecoderGenericType>(
  url: string,
  method: METHODS,
  serverDataDecoder?,
  requestConfig?: RequestConfigInterface,
): (data?: RequestOptions) => Promise<DecoderGenericType>;

export function createRequest<DecoderGenericType>(
  url: string,
  method: METHODS,
  serverDataDecoder?: Decoder<DecoderGenericType>,
  requestConfig: RequestConfigInterface = {},
) {
  return function (
    requestOptions: RequestOptions = {},
  ): Promise<DecoderGenericType | void> {
    logRequestStart(url, method, requestConfig, requestOptions);
    const options = requestOptions.options || {};
    return makeRequest(
      url,
      method,
      requestOptions.body,
      options,
      requestConfig,
      serverDataDecoder,
    ).then((result) => {
      logRequestEndSuccess(result);
      return result;
    });
  };
}
