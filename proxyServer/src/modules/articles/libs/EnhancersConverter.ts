import prepareUrl from "libs/prepareUrl";
import { ArticlesTypes } from "modules/articles/types";

const createTextEnhancer = (name, payload) => `#text-enhancer:${name}:${payload}#`;
const articlesTemplate = new RegExp(`#(${Object.values(ArticlesTypes).join("|")}):\\w+#`, "g");

class EnhancersConverter {
  convert(text, template, { name, payloadData }) {
    let index = 0;
    return text.replace(template, (...[sourceString]) => {
      const payload = payloadData[index];
      if (!payload) return sourceString;

      index++;
      return createTextEnhancer(name, payload);
    });
  }
}

class EnhancersConverterReadAlso extends EnhancersConverter {
  convert(text, articlesData) {
    return super.convert(text, articlesTemplate, {
      name: "ReadAlso",
      payloadData: this.createPayloadData(articlesData),
    });
  }

  createPayloadData(articlesData) {
    return articlesData.map(({ announceImageUrl, title, code }) =>
      JSON.stringify({
        image: announceImageUrl ? prepareUrl(announceImageUrl) : null,
        imageAspectRatio: 1.6,
        text: title,
        reference: prepareUrl(`/blog/${code}`),
      }),
    );
  }
}

export default new EnhancersConverterReadAlso();
