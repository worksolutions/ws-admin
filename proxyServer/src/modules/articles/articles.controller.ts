import { omit } from "ramda";
import { Request } from "express";
import { Controller, Get, Param, Post, Req } from "@nestjs/common";
import { CacheService } from "services/cache.service";
import { ProxyService } from "services/proxy.service";

import {
  convertServerErrorsToClientErrors,
  getContentWithReadAlsoEnhancers,
  loadArticle,
  modifyArticleResponse,
  modifyArticlesRequest,
  modifyArticlesTableResponse,
  modifyRelatedArticleResponse,
  modifyRequest,
  prepareArticleToFront,
} from "modules/articles/responseHandlers";
import { NUMBERS_FOR_STATUSES, PUBLISHED, UNPUBLISHED } from "modules/articles/matches/matchStatusAndCode";
import prepareArticleToEdit from "modules/articles/formatters/prepareArticleToEdit";

@Controller("api")
export class ArticlesController {
  constructor(private cacheService: CacheService, private proxyService: ProxyService) {}

  async getSimpleListArticles(articlesType) {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/${articlesType}`,
      modifyRequest: ({ requestParams: { params } }) => ({
        params: { ...params, orderDirection: "desc", orderField: "id" },
      }),
      modifyResponse: ({ data, meta }) => ({
        list: data.map(prepareArticleToFront),
        pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
      }),
    });
  }

  @Get("/articles/simple-list")
  async getArticlesSimpleList(): Promise<string> {
    return await this.getSimpleListArticles("articles");
  }

  @Get("/useful_articles/simple-list")
  async getUsefulArticlesSimpleList(): Promise<string> {
    return await this.getSimpleListArticles("useful_articles");
  }

  @Get("/articles/cards")
  async getArticleCards(): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: "/api/articles/",
      modifyRequest: modifyArticlesRequest,
      modifyResponse: ({ data, meta }) => {
        return {
          list: data.map((article) => prepareArticleToFront(article, "/articles/")),
          pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
        };
      },
    });
  }

  @Get("/useful_articles/cards")
  async getUsefulArticleCards(): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: "/api/useful_articles/",
      modifyRequest: modifyArticlesRequest,
      modifyResponse: ({ data, meta }) => {
        return {
          list: data.map((article) => prepareArticleToFront(article, "/useful_articles/")),
          pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
        };
      },
    });
  }

  @Get("/articles/table")
  async getArticlesTable(): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/articles`,
      modifyRequest: modifyArticlesRequest,
      modifyResponse: ({ data, meta }) => modifyArticlesTableResponse(data, meta, "articles"),
    });
  }

  @Get("/useful_articles/table")
  async getUsefulArticleTable(): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/useful_articles`,
      modifyRequest: modifyArticlesRequest,
      modifyResponse: ({ data, meta }) => modifyArticlesTableResponse(data, meta, "useful_articles"),
    });
  }

  @Get("/articles/:articleId")
  async getArticle(@Param() params): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/articles/${params.articleId}`,
      modifyResponse: (data, param) => modifyArticleResponse(data.data, param, false),
    });
  }

  @Get("/useful_articles/:articleId")
  async getUsefulArticle(@Param() params): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/useful_articles/${params.articleId}`,
      modifyResponse: (data, param) => modifyArticleResponse(data.data, param, false),
    });
  }

  @Get("/articles/:articleId/related-articles")
  async getRelatedArticles(@Param() params): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/articles/${params.articleId}`,
      modifyResponse: modifyRelatedArticleResponse,
    });
  }

  @Get("/useful_articles/:articleId/related-articles")
  async getRelatedUsefulArticles(@Param() params): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/useful_articles/${params.articleId}`,
      modifyResponse: modifyRelatedArticleResponse,
    });
  }

  @Get("/articles/:articleId/edit")
  async editArticle(@Param() params): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/articles/${params.articleId}`,
      modifyResponse: await prepareArticleToEdit(),
    });
  }

  @Get("/useful_articles/:articleId/edit")
  async editUsefulArticle(@Param() params): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/useful_articles/${params.articleId}`,
      modifyResponse: await prepareArticleToEdit(),
    });
  }

  @Post("/create-articles")
  async articleStore(): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/articles/store`,
      modifyResponse: ({ data }) => ({ id: data.id }),
      modifyRequest: ({ requestParams: { data } }) => {
        console.log(data);
        return {
          data: modifyRequest(data),
        }
      },
      modifyError: (err) => {
        err.errors = convertServerErrorsToClientErrors(err.errors);
      },
    });
  }

  @Post("/create-useful_articles")
  async usefulArticleStore(): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/useful_articles/store`,
      modifyResponse: ({ data }) => ({ id: data.id }),
      modifyRequest: ({ requestParams: { data } }) => ({
        data: modifyRequest(data),
      }),
      modifyError: (err) => {
        err.errors = convertServerErrorsToClientErrors(err.errors);
      },
    });
  }

  @Post("/save-useful_articles")
  async usefulArticleUpdate(): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/useful_articles/update`,
      modifyResponse: async () => null,
      modifyRequest: ({ requestParams: { data } }) => ({
        data: modifyRequest(data),
      }),
      modifyError: (err) => {
        err.errors = convertServerErrorsToClientErrors(err.errors);
      },
    });
  }

  @Post("/save-articles")
  async articleUpdate(): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/articles/update`,
      modifyResponse: async () => null,
      modifyRequest: ({ requestParams: { data } }) => ({
        data: modifyRequest(data),
      }),
      modifyError: (err) => {
        err.errors = convertServerErrorsToClientErrors(err.errors);
      },
    });
  }

  @Post("/content/articles-convert-enhancers")
  async convertEnhancers(@Req() req: Request): Promise<string> {
    const { content } = req.body;
    if (!content) return "";
    return getContentWithReadAlsoEnhancers(content, {
      method: "GET",
      baseURL: process.env.API_SERVER_HOST,
      params: req.query,
      data: req.body,
      headers: {
        ...omit(["host"], req.headers),
        origin: process.env.API_SERVER_HOST,
      },
    });
  }

  @Post("/article/:articleId/publish")
  async articlesPunish(): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/articles/update`,
      modifyRequest: async ({ urlParams, requestParams }) => {
        const article = await loadArticle(urlParams.articleId, requestParams);
        return {
          params: {},
          data: { ...article, status: NUMBERS_FOR_STATUSES[PUBLISHED] },
        };
      },
    });
  }

  @Post("/article/:articleId/unpublish")
  async getArticleUpdate(): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/articles/update`,
      modifyRequest: async ({ urlParams, requestParams }) => {
        const article = await loadArticle(urlParams.articleId, requestParams);
        return {
          params: {},
          data: { ...article, status: NUMBERS_FOR_STATUSES[UNPUBLISHED] },
        };
      },
    });
  }
}
