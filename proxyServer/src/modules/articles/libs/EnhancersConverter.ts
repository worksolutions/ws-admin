import prepareUrl from "libs/prepareUrl";
import { ArticlesTypes } from "modules/articles/types";

const createTextEnhancer = (name, payload) => `#text-enhancer:${name}:${payload}#`;
const getArticlesAcrossLine = Object.values(ArticlesTypes).join("|");

const articlesTemplate = (code) => new RegExp(`#(${getArticlesAcrossLine}):${code}#`, "g");
const articlesRegExp = new RegExp(`(${getArticlesAcrossLine})`, "g");

class EnhancersConverter {
  convert(text, template, { name, payloadData }) {
    return text.replace(template, createTextEnhancer(name, payloadData));
  }
}

class EnhancersConverterReadAlso extends EnhancersConverter {
  convert(text, articlesData) {
    articlesData.forEach((articlesDataItem) => {
      const [articleType] = text.match(articlesTemplate(articlesDataItem.code));

      text = super.convert(text, articlesTemplate(articlesDataItem.code), {
        name: "ReadAlso",
        payloadData: this.createPayloadData(articlesDataItem, articleType.match(articlesRegExp)[0]),
      });
    });

    return text;
  }

  createPayloadData({ announceImageUrl, title, code }, path) {
    return JSON.stringify({
      image: announceImageUrl ? prepareUrl(announceImageUrl) : null,
      imageAspectRatio: 1.6,
      text: title,
      reference: prepareUrl(`/${path}/${code}`),
    });
  }
}

export default new EnhancersConverterReadAlso();
