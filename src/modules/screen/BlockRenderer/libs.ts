export const loadBlockComponent = (type: string, cb: (cmp: any) => void) => {
  return import(`../blocks/${type}`).then(
    (module) => cb(module.default),
    (err) => console.warn(err, type),
  );
};
