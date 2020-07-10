import Cookie from "js-cookie";

import { path } from "libs/path";
import { RequestManager } from "libs/request";

interface ModifyTokenPipeElement {
  type: "modify-token";
  options: { tokenType: "jwt" | "default" };
}

interface SetCookiePipeElement {
  type: "set-cookie";
  options: { cookieName: string };
}

interface SendCookieToHeaderPipeElement {
  type: "send-cookie-to-header";
  options: { headerName: string; cookieName: string };
}

type Pipe = (ModifyTokenPipeElement | SetCookiePipeElement | SendCookieToHeaderPipeElement)[];

export interface AuthTokenSaveStrategy {
  dataSourceTokenField: string;
  defaultPipe: Pipe;
  authenticationPipe: Pipe;
}

const prepareTokenByType = {
  default: (token: string) => token,
  jwt: (token: string) => `Bearer ${token}`,
};

export class AuthTokenSaver {
  private static pipeHandlersForType = {
    "modify-token": function (options: ModifyTokenPipeElement["options"], token: string) {
      return prepareTokenByType[options.tokenType](token);
    },
    "set-cookie": function (options: SetCookiePipeElement["options"], token: string) {
      Cookie.set(options.cookieName, token);
      return token;
    },
    "send-cookie-to-header": function (options: SendCookieToHeaderPipeElement["options"], token: string) {
      RequestManager.beforeSendMiddleware.push((config) => {
        config.headers[options.headerName] = Cookie.get(options.cookieName);
      });
      return token;
    },
  };

  constructor(private authTokenSaveStrategy: AuthTokenSaveStrategy) {}

  private getTokenFromAuthResponseData(authResponseData: Record<string, any>) {
    return path(this.authTokenSaveStrategy.dataSourceTokenField, authResponseData);
  }

  private runPipe(pipe: Pipe, token: string) {
    pipe.forEach(({ type, options }) => {
      token = AuthTokenSaver.pipeHandlersForType[type](options as any, token);
    });
  }

  runAuthenticationTokenPipeline(authResponseData: Record<string, any>) {
    const token = this.getTokenFromAuthResponseData(authResponseData);
    this.runPipe(this.authTokenSaveStrategy.authenticationPipe, token);
  }

  runDefaultTokenPipeline() {
    this.runPipe(this.authTokenSaveStrategy.defaultPipe, "");
  }
}
