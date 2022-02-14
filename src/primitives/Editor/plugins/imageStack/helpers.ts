import { ModelsEnum, SelectorsEnum } from "./enums";

const getImageStackImageNodes = () => document.querySelectorAll(`.${SelectorsEnum.imageStack} figure`);

const getImageStackImageModels = (rootChildren: any[]) => {
  const images = [];

  for (const rootChild of rootChildren) {
    if (rootChild.name !== ModelsEnum.imageStackContainer) continue;

    const imageStack = rootChild.getChild(0);
    const imageStackChildren = imageStack._children._nodes;

    images.push(...imageStackChildren);
  }

  return images;
};

export { getImageStackImageNodes, getImageStackImageModels };
