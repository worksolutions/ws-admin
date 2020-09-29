import { is, last } from "ramda";
import { observe } from "mobx";

import { path } from "libs/path";
import { BaseError } from "libs/BaseError";

import { ContextDependencyInterface } from "modules/context/insertContext";

import { LoadingContainer } from "state/loadingContainer";

export interface DataSourceResultInterface<RESULT = any> {
  data: RESULT | null;
  initialData: RESULT | null;
  loadingContainer: LoadingContainer;
  reload: () => void;
  updateInitial: (data: RESULT | null) => void;
}

export function makeOnDependencyChangeUpdater(context: any, onUpdate: () => void) {
  return function (dependency: ContextDependencyInterface) {
    const contextValue = path([dependency.contextType, ...dependency.path.slice(0, -1)], context);
    if (!is(Object, contextValue))
      throw BaseError.make(
        `Поле в контексте не определено ${dependency.contextType}:${dependency.path.join(".")} для наблюдения`,
      );
    return observe(contextValue, last(dependency.path), onUpdate);
  };
}
