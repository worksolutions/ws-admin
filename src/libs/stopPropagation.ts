export default function (func?: Function) {
  return function (ev?: any) {
    if (ev) {
      ev.stopPropagation();
    }
    if (func) func(ev);
  };
}
