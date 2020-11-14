import { is, isNil, omit } from 'ramda';

import axios from 'axios';

import { Inject, Injectable } from '@nestjs/common';

import { REQUEST } from '@nestjs/core';

import { Request } from 'express';

import { ConfigService } from '@nestjs/config';

type ModifyFunctionType = (...data: any[]) => any;
type ModifyResponseFunctionType = (data: any, options: any) => any;

interface SendProxyRequestInterface {
  realServerUrl?: string | ((req: any) => string);
  modifyResponse?: ModifyResponseFunctionType;
  modifyRequest?: ModifyFunctionType;
  modifyError?: ModifyFunctionType;
}

@Injectable()
export class ProxyService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private configService: ConfigService,
  ) {}

  async sendProxyRequest({
    realServerUrl,
    modifyResponse,
    modifyRequest,
    modifyError,
  }: SendProxyRequestInterface): Promise<any> {
    const reqParams = await this.makeRequestParams(
      modifyRequest,
      realServerUrl,
    );
    try {
      const response = await ProxyService.sendRequest(reqParams);
      return await ProxyService.responseProcessing(
        modifyResponse,
        response,
        reqParams,
      );
    } catch (e) {
      const error = ProxyService.handleErrors(e, modifyError);
      this.request.res.status(error.status);
      this.request.res.send(error.data);
    }
  }

  private static async responseProcessing(
    modifyResponse,
    response,
    { resultUrl, requestParams },
  ) {
    if (!modifyResponse) return response.data;
    const modifiedResponse = await ProxyService.modifyOriginalResponse(
      response,
      modifyResponse,
      resultUrl,
      requestParams,
    );
    return modifiedResponse.data;
  }

  private async makeRequestParams(
    modifyRequest: (...data: any[]) => any,
    realServerUrl: string | ((req: any) => string),
  ) {
    const requestParams = await this.prepareRequestParams(modifyRequest);
    const resultUrl = this.prepareRequestUrl(realServerUrl);
    return { requestParams, resultUrl };
  }

  private static sendRequest({ resultUrl, requestParams }): Promise<any> {
    return axios(resultUrl, requestParams);
  }

  private prepareRequestUrl(realServerUrl?: any): string {
    return (
      (is(Function, realServerUrl)
        ? realServerUrl(this.request)
        : realServerUrl) || this.request.originalUrl
    );
  }

  private async prepareRequestParams(
    modifyRequest?: ModifyFunctionType,
  ): Promise<Record<string, any>> {
    const apiHost = this.configService.get('API_SERVER_HOST');
    const headers = {
      ...omit(['host'], this.request.headers),
      origin: apiHost,
    };
    const requestParams = {
      method: this.request.method,
      baseURL: apiHost,
      params: this.request.query,
      data: this.request.body,
      headers,
    };
    return modifyRequest
      ? await this.modifyRequestParams(requestParams, modifyRequest)
      : requestParams;
  }

  private async modifyRequestParams(
    requestParams: Record<string, any>,
    modifyRequest: ModifyFunctionType,
  ): Promise<Record<string, any>> {
    return Object.assign(
      requestParams,
      await modifyRequest({
        urlParams: this.request.params,
        requestParams,
        request: this.request,
      }),
    );
  }

  private static async modifyOriginalResponse(
    response: Record<string, any>,
    modifyResponse: ModifyFunctionType,
    resultUrl?: string,
    originalRequestParams?: Record<string, any>,
  ) {
    const result = await modifyResponse(response.data, {
      status: response.status,
      resultUrl,
      originalRequestParams,
    });
    if (!isNil(result)) {
      response.data = result;
    }
    return response;
  }

  private static handleErrors(error: any, modifyError?: ModifyFunctionType) {
    const { response } = error;
    if (!response) {
      return { data: { error: 'proxy - internal server error' }, status: 500 };
    }

    if (modifyError) {
      const newData = modifyError(response.data);
      response.data = isNil(newData) ? response.data : newData;
    }

    return { data: response.data, status: response.status };
  }
}
