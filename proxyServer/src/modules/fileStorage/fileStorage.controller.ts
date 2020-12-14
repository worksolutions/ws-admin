import { Controller, Post, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { CacheService } from "services/cache.service";
import { ProxyService } from "services/proxy.service";

import prepareUrl from "libs/prepareUrl";

const FormData = require("form-data");

@Controller("api")
export class FileStorageController {
  constructor(private cacheService: CacheService, private proxyService: ProxyService) {}

  @Post("file_storage/store")
  @UseInterceptors(FileInterceptor("file"))
  async store() {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: "/api/file_storage/store",
      modifyRequest: ({ request, requestParams: { headers } }) => {
        const form = new FormData();
        form.append("file", request.file.buffer, request.file.originalname);
        return {
          data: form.getBuffer(),
          headers: { ...headers, ...form.getHeaders() },
        };
      },
      modifyResponse: ({ data }) => {
        return {
          id: data.id,
          path: prepareUrl(data.path),
        };
      },
    });
  }
}
