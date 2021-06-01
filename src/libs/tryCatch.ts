export function tryCatch<T>(rightCallback: (...args: any) => any, leftCallback: (e: any) => null): T | null {
  try {
    return rightCallback();
  } catch (e) {
    return leftCallback(e);
  }
}
