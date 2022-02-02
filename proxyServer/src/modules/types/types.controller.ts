import { Controller, Get, Param, } from "@nestjs/common";

import { ProxyService } from "services/proxy.service";

@Controller("api")
export class TypesController {
  constructor(private proxyService: ProxyService) {}

  @Get("/types/:typeId")
  async getDetailCategory(@Param() params) {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: "/api/types/" + params.typeId,
      modifyResponse: ({ data }) => ({
        id: data.id,
        title: data.name,
        code: data.code,
      }),
    });
  }

  @Get("types")
  async getCategories() {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: "/api/types/",
      modifyResponse: ({ data, meta }) => {
        return {
          list: data.map((type) => ({
            id: type.id,
            name: type.name,
            code: type.code,
          })),
          pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
        };
      },
    });
  }

  @Get("/types-list")
  async getCategorieslist() {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: "/api/types/",
      modifyResponse: ({ data }) => data.map((type) => ({ code: type.id, title: type.name })),
    });
  }
}
