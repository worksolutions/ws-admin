export function calculatePaginationParams(page: number, perPage: number, elementsCount: number) {
  const lastElementNumberOnPage = page * perPage;
  const firstElementNumberOnPage = lastElementNumberOnPage - perPage + 1;
  const pages = Math.ceil(elementsCount / perPage);
  return {
    lastElementNumberOnPage: Math.min(lastElementNumberOnPage, elementsCount),
    firstElementNumberOnPage,
    pages,
  };
}

export function getMaskedInputWidth(lastPage: number) {
  const oneCharacterWidth = 8;
  const length = lastPage.toString().length;
  const symbolsCount = Math.max(length, 2);

  return 26 + symbolsCount * oneCharacterWidth;
}
