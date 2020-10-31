import { FC } from "react";
import { omit } from "ramda";

import isEqual from "./isEqual";

/**
 * декоратор для глубокого сравнения объектов в props
 * @function
 * @param {[]string} ignorePropNames - игнорировать пропсы с указанными именами при проверке
 * @example
 * @performance(["onClick"])
 * class App extends React.Component {
 *    render() {}
 * }
 */
export default function performance<T>(ignorePropNames: string[] = []): (App: any) => FC<T> {
  return function decorator(App) {
    App.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps: any) {
      const propsWithoutIgnored = omit(ignorePropNames, this.props);
      const nextPropsWithoutIgnored = omit(ignorePropNames, nextProps);
      return !isEqual(propsWithoutIgnored, nextPropsWithoutIgnored);
    };

    return App;
  };
}
