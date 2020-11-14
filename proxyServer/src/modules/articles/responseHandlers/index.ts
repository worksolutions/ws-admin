import * as moment from 'moment';

import axios from 'axios';

import prepareUrl from 'libs/prepareUrl';

import EnhancersConverterReadAlso from '../libs/EnhancersConverter';

import matchCodeAndStatusOptions from 'modules/articles/matches/matchCodeAndStatusOptions';

import { assoc, filter, isNil, omit, prop } from 'ramda';

import matchCodeAndActions from 'modules/articles/matches/matchCodeAndActions';

import matchStatusAndCode from 'modules/articles/matches/matchStatusAndCode';

import matchCodeAndStatusForFront from 'modules/articles/matches/matchCodeAndStatusForFront';

const statusesByNumber = {
  0: 'DRAFT',
  1: 'PUBLISHED',
  2: 'UN_PUBLISHED',
};

function convertImage(image) {
  image.path = prepareUrl(image.path);
  image.name = image.originalName + '.' + image.path.split('.').pop();
  return image;
}

async function getSubArticlesContent(text, getArticle) {
  const articleMatch = text.match(/#article:[\w-_]+#/g);
  if (!articleMatch) return [];

  return await Promise.all(
    articleMatch.map(match => {
      const articleCodeText = match.split('#')[1];
      return getArticle(articleCodeText.split(':')[1]);
    }),
  );
}

export async function getContentWithReadAlsoEnhancers(
  content,
  originalRequestParams,
) {
  try {
    const articles = (await getSubArticlesContent(content, code => {
      return axios('/api/blog/article/' + code, originalRequestParams);
    })) as any;

    const articlesData = articles.map(article => article.data.data);
    return EnhancersConverterReadAlso.convert(content, articlesData);
  } catch (e) {
    console.error(e);
    return content;
  }
}

export async function modifyArticleResponse(data, originalRequestParams) {
  data.status = statusesByNumber[data.status];
  if (data.publishedAt)
    data.publishedAt = moment.unix(data.publishedAt).format('DD.MM.YYYY');
  if (data.author && data.author.image)
    data.author.image.path = prepareUrl(data.author.image.path);
  if (data.announceImage) data.announceImage = convertImage(data.announceImage);
  if (data.contentImage) data.contentImage = convertImage(data.contentImage);
  if (data.background) data.background = convertImage(data.background);

  if (false && data.relatedArticles) {
    const relatedArticles = await module.exports.modifyRelatedArticleResponse(
      data,
      originalRequestParams,
    );
    data.relatedArticles = data.relatedArticles.map((article, index) => {
      const isPublished = article.status === 1;
      const relatedArticle = relatedArticles[index];
      const { badgeColor, hint } = matchCodeAndStatusOptions[article.status];

      return {
        id: article.id,
        heading: moment
          .unix(article[isPublished ? 'publishedAt' : 'createdAt'])
          .format('DD MMMM YYYY'),
        statuses: [
          {
            icon: 'badge',
            color: badgeColor,
            hint,
            size: 'SMALL',
          },
        ],
        title: article.title,
        image: relatedArticle.image,
        redirectReference: '/content/articles/' + article.id,
        actions: [],
      };
    });
  }

  if (!data.content) {
    data.enhancedContent = data.content;
    return data;
  }

  data.enhancedContent = await getContentWithReadAlsoEnhancers(
    data.content,
    originalRequestParams,
  );

  return data;
}

export async function modifyRelatedArticleResponse(
  data,
  originalRequestParams,
) {
  const articles = await Promise.all(
    data.relatedArticles.map(article =>
      axios('/api/blog/article/' + article.code, originalRequestParams),
    ),
  );
  return articles
    .map((article: any) => article.data.data)
    .map(article => {
      const isPublished = article.status === 1;
      const { badgeColor, hint } = matchCodeAndStatusOptions[article.status];

      return {
        title: article.title,
        id: article.id,
        image: article.announceImageUrl
          ? prepareUrl(article.announceImageUrl)
          : null,
        redirectReference: '/content/articles/' + article.id,
        heading: moment
          .unix(isPublished ? article.publishedAt : article.createdAt)
          .format('DD MMMM YYYY'),
        statuses: [
          {
            icon: 'badge',
            color: badgeColor,
            hint,
            size: 'SMALL',
          },
        ],
      };
    });
}

const numbersByStatuses = {
  DRAFT: 0,
  PUBLISHED: 1,
  UN_PUBLISHED: 2,
};

export function modifyRequest(data) {
  data.status = numbersByStatuses[data.status];
  if (data.publishedAt)
    data.publishedAt = moment(data.publishedAt, 'DD.MM.YYYY').unix();
  if (data.keywords)
    data.keywords = data.keywords.map(prop('title')).join(', ');
  if (data.relatedArticles)
    data.relatedArticles = data.relatedArticles.map(prop('id'));
  return data;
}

export function convertServerErrorsToClientErrors(errors) {
  if (!errors) return {};
  return Object.fromEntries(
    Object.entries(errors).map(([key, value]) => [key, value[0]]),
  );
}

export async function loadArticle(articleId, requestParams) {
  const {
    data: { data },
  } = await axios('/api/articles/' + articleId, {
    ...requestParams,
    method: 'GET',
  });
  return filter(value => !isNil(value), {
    ...omit(['createdBy', 'updatedBy'], data),
    author: data.author?.id,
    tagDescription: data.tagDescription,
    category: data.category?.id,
    relatedArticles: data.relatedArticles?.map(prop('id')),
    contentImage: data.contentImage?.id,
    announceImage: data.announceImage?.id,
    background: data.background?.id,
    status: 1,
  });
}

export const prepareArticleToFront = article => {
  const isPublished = article.status === 1;
  const { badgeColor, hint } = matchCodeAndStatusOptions[article.status];

  return {
    id: article.id,
    code: article.code,
    title: article.title,
    image: article.announceImage
      ? prepareUrl(article.announceImage.path)
      : null,
    redirectReference: '/content/articles/' + article.id,
    heading: moment
      .unix(isPublished ? article.publishedAt : article.createdAt)
      .format('DD MMMM YYYY'),
    statuses: [
      {
        icon: 'badge',
        color: badgeColor,
        hint,
        size: 'SMALL',
      },
    ],
    actions: [
      {
        name: 'Редактировать',
        icon: 'edit',
        iconColor: 'gray-blue/05',
        action: {
          type: 'redirect',
          options: {
            reference: '/content/articles/' + article.id + '/edit',
          },
        },
      },
      matchCodeAndActions[article.status](article.id, 'cards'),
    ],
  };
};

export const modifyArticlesRequest = ({ requestParams: { params } }) => {
  let result = params;
  if (params.orderField === 'publishedAt')
    result = assoc('orderField', 'published_at', result);
  if (params.publishedAt)
    result = assoc(
      'publishedAt',
      moment.utc(params.publishedAt, 'DD.MM.YYYY').unix(),
      result,
    );
  result = assoc('status', matchStatusAndCode[result.status], result);
  return { params: result };
};

export function modifyArticlesTableResponse({ data, meta }) {
  return {
    list: data.map(article => ({
      id: article.id,
      announceImage: article.announceImage
        ? prepareUrl(article.announceImage.path)
        : null,
      name: {
        value: article.title,
        redirectReference: '/content/articles/' + article.id,
      },
      publishedAt: article.publishedAt
        ? moment.unix(article.publishedAt).format('DD MMMM YYYY')
        : '',
      status: matchCodeAndStatusForFront[article.status],
      actions: {
        type: 'dropdown',
        list: [
          {
            name: 'Редактировать',
            icon: 'edit',
            iconColor: 'gray-blue/05',
            action: {
              type: 'redirect',
              options: {
                reference: '/content/articles/' + article.id + '/edit',
              },
            },
          },
          matchCodeAndActions[article.status](article.id, 'table'),
        ],
      },
    })),
    pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
  };
}