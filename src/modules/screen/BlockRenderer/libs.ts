export const loadBlockComponent = (type: string, cb: (cmp: any) => void) =>
  import(`../blocks/${type}`).then(
    (module) => cb(module.default),
    (err) => console.warn(err, type),
  );
