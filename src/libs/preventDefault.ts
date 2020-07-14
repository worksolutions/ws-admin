export default function (func?: Function | null) {
  return function (ev?: any) {
    if (ev) {
      ev.preventDefault();
    }
    func && func(ev);
  };
}
