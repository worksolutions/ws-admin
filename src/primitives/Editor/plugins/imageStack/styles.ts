import { css } from "styled-components";

import { getColor } from "../../../../libs/styles";

import { secondaryStyle } from "../../../Button/styles/types/secondary";

export const imageStackStyles = css`
  .image-stack {
    border: 1px solid ${getColor("border/opaque")};
    border-radius: 20px;

    margin: 64px 0;

    figcaption,
    .ck-widget__type-around__button {
      display: none !important;
    }

    .image:first-child img {
      border-radius: 20px 20px 0 0;
    }

    .image:last-child img {
      border-radius: 0 0 20px 20px;
    }

    .image:first-child:last-child img {
      border-radius: 20px;
    }

    .image {
      width: 100%;
      margin: 0;
    }

    &__button {
      ${secondaryStyle};

      position: absolute !important;
      top: 0;
      right: 0;

      background-color: ${getColor("white")} !important;
      border-radius: 6px;

      padding: 8px !important;
      margin: 8px !important;

      &:hover {
        background-color: ${getColor("gray-blue/01")} !important;
      }

      &:active {
        background-color: ${getColor("gray-blue/02")} !important;
      }
    }
  }
`;
