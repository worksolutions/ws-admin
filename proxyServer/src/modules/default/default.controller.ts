import { All, Controller, Req } from "@nestjs/common";

import { CacheService } from "services/cache.service";

import { ProxyService } from "services/proxy.service";

import { Request } from "express";

@Controller("api")
export class DefaultController {
  constructor(private cacheService: CacheService, private proxyService: ProxyService) {}

  @All("*")
  index(@Req() request: Request) {
    return this.proxyService.sendProxyRequest({});
  }
}
