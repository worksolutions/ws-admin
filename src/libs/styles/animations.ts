import { css, Keyframes } from "styled-components";
import { CSSProperties } from "react";

import { memoizeWithContext } from "../memoizeWithContext";
import { isString } from "../is";
import { sortObjectEntriesByKey } from "../sorting";

type AnimationArguments = {
  name: Keyframes;
  duration?: CSSProperties["animationDuration"];
  timingFunction?: CSSProperties["animationTimingFunction"];
  delay?: CSSProperties["animationDelay"];
  iterationCount?: CSSProperties["animationIterationCount"];
  direction?: CSSProperties["animationDirection"];
  fillMode?: CSSProperties["animationFillMode"];
  playState?: CSSProperties["animationPlayState"];
};

const makeAnimation = ({ name, ...data }: AnimationArguments) => [
  name,
  " " +
    sortObjectEntriesByKey(Object.entries(data))
      .map((el) => el[1])
      .join(" "),
];

export const animation = memoizeWithContext(
  function (a: AnimationArguments[]) {
    const result = a.map(makeAnimation);
    this.animations = result;
    return result
      .map(([keyFrame, string]) => {
        // @ts-ignore
        return `${isString(keyFrame) ? keyFrame : keyFrame.id}${string}`;
      })
      .join("");
  },
  function (animations: AnimationArguments[]) {
    return css`
      animation: ${(this.animations as ReturnType<typeof makeAnimation>[]).map((el, index) => [
        index === 0 ? "" : ", ",
        ...el,
      ])};
    `;
  },
);
