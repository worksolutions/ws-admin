import * as moment from "moment";
import axios from "axios";
import { assoc, concat, filter, isNil, omit, prop } from "ramda";

import prepareUrl from "libs/prepareUrl";

import matchCodeAndStatusOptions from "modules/articles/matches/matchCodeAndStatusOptions";
import matchCodeAndActions from "modules/articles/matches/matchCodeAndActions";
import matchCodeAndStatusForFront from "modules/articles/matches/matchCodeAndStatusForFront";
import { NUMBERS_FOR_STATUSES, STATUSES_FOR_NUMBERS } from "modules/articles/matches/matchStatusAndCode";
import { ArticlesTypes } from "modules/articles/types";

import EnhancersConverterReadAlso from "../libs/EnhancersConverter";

function convertImage(image) {
  image.path = prepareUrl(image.path);
  image.name = image.originalName + "." + image.path.split(".").pop();
  return image;
}

const createArticleRegExp = (articleType) => new RegExp(`#${articleType}:[\-\\w]+#`, "g");

async function getSubArticlesContent(text, articleType, getArticle) {
  const articleMatch = text.match(createArticleRegExp(articleType));
  if (!articleMatch) return [];

  return await Promise.all(
    articleMatch.map((match) => {
      const articleCodeText = match.split("#")[1];
      return getArticle(articleCodeText.split(":")[1]);
    }),
  );
}

async function getSubArticlesData(content, originalRequestParams) {
  return await Promise.all([
    getSubArticlesContent(content, ArticlesTypes.BLOG_ARTICLE, (code) =>
      axios("/api/blog/article/" + code, originalRequestParams).catch(() => null),
    ),
    getSubArticlesContent(content, ArticlesTypes.USEFUL_ARTICLE, (code) =>
      axios("/api/useful/" + code, originalRequestParams).catch(() => null),
    ),
  ]);
}

export async function getContentWithReadAlsoEnhancers(content, originalRequestParams) {
  try {
    const [articles, usefulArticles] = await getSubArticlesData(content, originalRequestParams);

    const articlesData = articles.filter(Boolean).map((article) => article.data.data);
    const usefulArticlesData = usefulArticles.filter(Boolean).map((article) => article.data.data);

    return EnhancersConverterReadAlso.convert(content, concat(articlesData, usefulArticlesData));
  } catch (e) {
    return content;
  }
}

export async function modifyArticleResponse(data, { originalRequestParams }, withRelatedArticles = false) {
  data.status = STATUSES_FOR_NUMBERS[data.status];
  if (data.publishedAt) data.publishedAt = moment.unix(data.publishedAt).format("DD.MM.YYYY");
  if (data.author && data.author.image) data.author.image.path = prepareUrl(data.author.image.path);
  if (data.announceImage) data.announceImage = convertImage(data.announceImage);
  if (data.contentImage) data.contentImage = convertImage(data.contentImage);
  if (data.background) data.background = convertImage(data.background);

  if (withRelatedArticles && data.relatedArticles) {
    data.relatedArticles = await modifyRelatedArticleResponse({ data }, { originalRequestParams });
  } else {
    data.relatedArticles = [];
  }

  if (!data.content) {
    data.enhancedContent = data.content;
    return data;
  }

  data.enhancedContent = await getContentWithReadAlsoEnhancers(data.content, originalRequestParams);

  return data;
}

export async function modifyRelatedArticleResponse({ data }, { originalRequestParams }) {
  const articles = await Promise.all(
    data.relatedArticles.map((article) => axios("/api/articles/" + article.id, originalRequestParams)),
  );

  return articles
    .map((article: any) => article.data.data)
    .map((article) => {
      const { badgeColor, hint } = matchCodeAndStatusOptions[article.status];

      return {
        title: article.title,
        id: article.id,
        image: article.announceImage ? prepareUrl(article.announceImage.path) : null,
        redirectReference: "/content/articles/" + article.id,
        heading: moment.unix(article.createdAt).format("DD MMMM YYYY"),
        statuses: [
          {
            icon: "badge",
            color: badgeColor,
            hint,
            size: "SMALL",
          },
        ],
      };
    });
}

export function modifyRequest(data) {
  data.status = NUMBERS_FOR_STATUSES[data.status];
  if (data.publishedAt) data.publishedAt = moment(data.publishedAt, "DD.MM.YYYY").unix();
  if (data.keywords) data.keywords = data.keywords.map(prop("title")).join(", ");
  if (data.relatedArticles) data.relatedArticles = data.relatedArticles.map(prop("id"));
  return data;
}

export function convertServerErrorsToClientErrors(errors) {
  if (!errors) return {};
  return Object.fromEntries(Object.entries(errors).map(([key, value]) => [key, value[0]]));
}

export async function loadArticle(articleId, requestParams) {
  const {
    data: { data },
  } = await axios("/api/articles/" + articleId, {
    ...requestParams,
    method: "GET",
  });
  return filter((value) => !isNil(value), {
    ...omit(["createdBy", "updatedBy"], data),
    author: data.author?.id,
    tagDescription: data.tagDescription,
    category: data.category?.id,
    type: data.type?.id,
    relatedArticles: data.relatedArticles?.map(prop("id")),
    contentImage: data.contentImage?.id,
    announceImage: data.announceImage?.id,
    background: data.background?.id,
  });
}

export const prepareArticleToFront = (article, urlArticle) => {
  const { badgeColor, hint } = matchCodeAndStatusOptions[article.status];

  return {
    id: article.id,
    code: article.code,
    title: article.title,
    image: article.announceImage ? prepareUrl(article.announceImage.path) : null,
    redirectReference: `/content${urlArticle}` + article.id,
    heading: moment.unix(article.createdAt).format("DD MMMM YYYY"),
    statuses: [
      {
        icon: "badge",
        color: badgeColor,
        hint,
        size: "SMALL",
      },
    ],
    actions: [
      {
        name: "Редактировать",
        icon: "edit",
        iconColor: "gray-blue/05",
        action: {
          type: "redirect",
          options: {
            reference: "/content/articles/" + article.id + "/edit",
          },
        },
      },
      matchCodeAndActions[article.status](article.id, "cards"),
    ],
  };
};

export const modifyArticlesRequest = ({ requestParams: { params } }) => {
  let result = params;
  if (params.orderField === "publishedAt") result = assoc("orderField", "published_at", result);

  if (params.publishedAt) result = assoc("publishedAt", moment.utc(params.publishedAt, "DD.MM.YYYY").unix(), result);

  result = assoc("status", NUMBERS_FOR_STATUSES[result.status], result);
  return { params: result };
};

export function modifyArticlesTableResponse(data, meta, name) {
  return {
    list: data.map((article) => ({
      id: article.id,
      announceImage: article.announceImage ? prepareUrl(article.announceImage.path) : null,
      name: {
        value: article.title,
        redirectReference: `/content/${name}/` + article.id,
      },
      publishedAt: article.publishedAt ? moment.unix(article.publishedAt).format("DD MMMM YYYY") : "",
      status: matchCodeAndStatusForFront[article.status],
      actions: {
        type: "dropdown",
        list: [
          {
            name: "Редактировать",
            icon: "edit",
            iconColor: "gray-blue/05",
            action: {
              type: "redirect",
              options: {
                reference: "/content/articles/" + article.id + "/edit",
              },
            },
          },
          matchCodeAndActions[article.status](article.id, "table"),
        ],
      },
    })),
    pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
  };
}
