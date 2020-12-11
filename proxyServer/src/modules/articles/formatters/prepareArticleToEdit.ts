import {modifyArticleResponse} from "../responseHandlers";
export default function prepareArticleToEdit() {
  return async ({data}, params) => {
    const article = await modifyArticleResponse(data, params, true);
    if (article.keywords) {
      article.keywords = article.keywords.split(", ").map((code) => ({code, title: code}));
    }
    if (article.category) {
      article.category = article.category.id;
    }
    if (article.author) {
      article.author = article.author.id;
    }
    return article;
  }
}
