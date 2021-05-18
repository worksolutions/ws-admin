import { All, Controller, Post, Req } from "@nestjs/common";

import { CacheService } from "services/cache.service";

import { ProxyService } from "services/proxy.service";

import { Request } from "express";

@Controller("api")
export class DefaultController {
  constructor(private cacheService: CacheService, private proxyService: ProxyService) {}

  // @Post("/login")
  // login(@Req() request: Request) {
  //   return this.proxyService.sendProxyRequest({
  //     realServerUrl: "request.url",
  //   });
  // }

  @All("*")
  index(@Req() request: Request) {
    return this.proxyService.sendProxyRequest({});
  }
}
