import * as React from "react";

export type StyledComponentsAS<T = any> = keyof JSX.IntrinsicElements | React.ComponentType<T>;
