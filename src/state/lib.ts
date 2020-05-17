export function promisifyAPI<T>(
  api: () => Promise<T>,
  stateStart: () => any = () => {},
  stateSuccess: (data: T) => any = () => {},
  stateError: (data: any) => any = () => {},
): Promise<T> {
  return new Promise((resolve, reject) => {
    stateStart();
    api().then(
      (data) => {
        stateSuccess(data);
        resolve(data);
      },
      (error) => {
        stateError(error);
        reject(error);
      },
    );
  });
}
