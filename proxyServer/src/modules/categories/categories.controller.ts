import { Controller, Get, Param, Post } from "@nestjs/common";

import { CacheService } from "services/cache.service";

import { ProxyService } from "services/proxy.service";

@Controller("api")
export class CategoriesController {
  constructor(private cacheService: CacheService, private proxyService: ProxyService) {}

  @Get("/category/:categoryId")
  async getDetailCategory(@Param() params) {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: "/api/categories/" + params.categoryId,
      modifyResponse: ({ data }) => ({
        id: data.id,
        title: data.name,
        code: data.code,
      }),
    });
  }

  @Get("categories")
  async getCategories() {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: "/api/categories/",
      modifyResponse: ({ data, meta }) => {
        return {
          list: data.map((category) => ({
            id: category.id,
            name: category.name,
            code: category.code,
            actions: {
              list: [
                {
                  mode: "button",
                  icon: "edit",
                  iconColor: "gray-blue/07",
                  action: [
                    {
                      type: "api:request",
                      options: {
                        reference: `/category/${category.id}`,
                        method: "get",
                        saveToContext: "screen:tempCategory",
                      },
                    },
                    {
                      type: "open-modal",
                      options: {
                        name: "edit-category",
                      },
                    },
                  ],
                },
                {
                  mode: "button",
                  icon: "delete",
                  iconColor: "gray-blue/07",
                  action: [
                    {
                      type: "api:request",
                      options: {
                        reference: `/category/${category.id}`,
                        method: "get",
                        saveToContext: "screen:tempCategory",
                      },
                    },
                    {
                      type: "open-modal",
                      options: {
                        name: "delete-category",
                      },
                    },
                  ],
                },
              ],
            },
          })),
          pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
        };
      },
    });
  }

  @Get("/categories-list")
  async getCategorieslist() {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: "/api/categories/",
      modifyResponse: ({ data }) => data.map((category) => ({ code: category.id, title: category.name })),
    });
  }

  @Post("/categories/store")
  async getCategoriesStore() {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: "/api/categories/store",
      modifyResponse: ({ data }) => ({ code: data.id, title: data.name }),
    });
  }
}
