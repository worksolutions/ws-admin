import React from "react";

import { withPerformance } from "./withPerformance";

export const noneStrategy = function (component: any) {
  return component;
};

export const memoStrategy = function (component: any) {
  return React.memo(component);
};

export const createPerformanceStrategy = function (ignorePropNames: string[]) {
  return function (component: any) {
    return withPerformance(ignorePropNames)(component);
  };
};

export * from "./withPerformance";
