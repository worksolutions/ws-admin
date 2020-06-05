export default function <T = string>(func: (data: T) => void) {
  return function (ev?: any) {
    if (ev && ev.target) {
      func(ev.target.value);
      return;
    }

    func((null as unknown) as T);
  };
}
