import {ProxyService} from "services/proxy.service";
import {
  modifyArticlesRequest,
  modifyArticlesTableResponse,
  prepareArticleToFront
} from "modules/articles/responseHandlers";

export async function getArticlesCardsData(proxyService: ProxyService ,urlArticle: string) {
  return await proxyService.sendProxyRequest({
    realServerUrl: '/api' + urlArticle,
    modifyRequest: modifyArticlesRequest,
    modifyResponse: ({data, meta}) => {
      return {
        list: data.map((article) => prepareArticleToFront(article, urlArticle)),
        pagination: {pagesCount: meta.last_page, itemsCount: meta.total},
      };
    },
  });
}

export async function getArticlesTableData(proxyService: ProxyService ,serverUrl: string) {
  return await proxyService.sendProxyRequest({
    realServerUrl: serverUrl,
    modifyRequest: modifyArticlesRequest,
    modifyResponse: modifyArticlesTableResponse,
  });
}

