import React from "react";

import performance from "../index";

/**
 * декоратор для глубокого сравнения объектов в props на функциональных компанентах. Использовать React.memo не нужно
 * @function
 * @param {[]string} ignorePropNames - игнорировать пропсы с указанными именами при проверке
 * @example
 * withPerformance(["onClick"])(function() { return null; })
 */
export default function withPerformance(ignorePropNames: string[] = []) {
  return function <T>(Fc: T) {
    // @ts-ignore
    return performance(ignorePropNames)(
      class extends React.Component<T> {
        render() {
          // @ts-ignore
          return <Fc {...this.props} />;
        }
      },
    ) as T;
  };
}
