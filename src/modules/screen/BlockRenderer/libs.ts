export const loadBlockComponent = (type: string, cb: (cmp: any) => void) => {
  console.log(type);
  import(`../blocks/${type}`).then((module) => cb(module.default), console.error);
};
