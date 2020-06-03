import mainConfig from "./responses/main-config";

export const getMainConfig = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(mainConfig), 1000);
  });
