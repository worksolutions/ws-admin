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

@Controller("api")
export class ArticlesController {
  constructor(private cacheService: CacheService, private proxyService: ProxyService) {}

  @Get("/articles/simple-list")
  async getArticlesSimpleList(): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/articles`,
      modifyRequest: ({ requestParams: { params } }) => {
        return {
          params: { ...params, orderDirection: "desc", orderField: "id" },
        };
      },
      modifyResponse: ({ data, meta }) => {
        return {
          list: data.map(prepareArticleToFront),
          pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
        };
      },
    });
  }

  @Get("articles/cards")
  async getArticleCards(): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/articles`,
      modifyRequest: modifyArticlesRequest,
      modifyResponse: ({ data, meta }) => {
        return {
          list: data.map(prepareArticleToFront),
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
      modifyResponse: modifyArticlesTableResponse,
    });
  }

  @Get("/article/:articleId")
  async getArticle(@Param() params): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/articles/${params.articleId}`,
      modifyResponse: (data, param) => modifyArticleResponse(data.data, param, false),
    });
  }

  @Get("/article/:articleId/related-articles")
  async getRelatedArticles(@Param() params): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/articles/${params.articleId}`,
      modifyResponse: modifyRelatedArticleResponse,
    });
  }

  @Get("/article/:articleId/edit")
  async editArticle(@Param() params): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/articles/${params.articleId}`,
      modifyResponse: async ({ data }, params) => {
        const article = await modifyArticleResponse(data, params, true);
        if (article.keywords) {
          article.keywords = article.keywords.split(", ").map((code) => ({ code, title: code }));
        }
        if (article.category) {
          article.category = article.category.id;
        }
        if (article.author) {
          article.author = article.author.id;
        }
        return article;
      },
    });
  }

  @Post("/create-article")
  async articleStore(): Promise<string> {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: `/api/articles/store`,
      modifyResponse: ({ data }) => ({ id: data.id }),
      modifyRequest: ({ requestParams: { data } }) => ({
        data: modifyRequest(data),
      }),
      modifyError: (err) => {
        err.errors = convertServerErrorsToClientErrors(err.errors);
      },
    });
  }

  @Post("/save-article")
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
