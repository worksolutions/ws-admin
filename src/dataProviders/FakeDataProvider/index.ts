import mainConfig from "./responses/main-config.json";

export const getMainConfig = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(mainConfig), 1000);
  });
