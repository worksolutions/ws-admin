import prepareUrl from "libs/prepareUrl";

class EnhancersConverter {
  convert(text, template, enhancerConfig) {
    let index = 0;

    return text.replace(template, () => {
      const payload = enhancerConfig.payloadData[index];
      index++;
      return `#text-enhancer:${enhancerConfig.name}:${payload}#`;
    });
  }
}

class EnhancersConverterReadAlso extends EnhancersConverter {
  convert(text, articlesData) {
    const payloadData = articlesData.map((article) =>
      JSON.stringify({
        image: article.announceImageUrl ? prepareUrl(article.announceImageUrl) : null,
        imageAspectRatio: 1.6,
        text: article.title,
        reference: prepareUrl(`/blog/${article.code}`),
      }),
    );
    return super.convert(text, /#article:[\w-_]+#/g, { name: "ReadAlso", payloadData });
  }
}

export default new EnhancersConverterReadAlso();
