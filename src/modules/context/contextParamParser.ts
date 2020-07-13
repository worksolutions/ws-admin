export function getContextTypeAndPathByParam(param: string) {
  if (!param.includes(":")) {
    return {
      type: "global",
      path: param,
    };
  }
  const [type, path] = param.split(":");
  return {
    type,
    path,
  };
}
