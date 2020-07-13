import { boxShadow, createAlphaColor } from "libs/styles";

export const elevation8 = boxShadow(
  [0, 0, 2, 0, createAlphaColor("black", 15)],
  [0, 4, 8, 0, createAlphaColor("black", 20)],
);

export const elevation16 = boxShadow(
  [0, 2, 6, 0, createAlphaColor("black", 15)],
  [0, 8, 16, 0, createAlphaColor("black", 20)],
);

export const elevation24 = boxShadow(
  [0, 2, 6, 0, createAlphaColor("black", 10)],
  [0, 16, 24, 0, createAlphaColor("black", 20)],
);

export const elevation32 = boxShadow(
  [0, 4, 8, 0, createAlphaColor("black", 10)],
  [0, 16, 24, 0, createAlphaColor("black", 10)],
  [0, 24, 32, 0, createAlphaColor("black", 20)],
);
