/* eslint-disable max-lines */

import { css } from "styled-components";

import { TypographyTypes } from "primitives/Typography";
import { blockQuoteCursorStyles, blockQuoteStyles } from "primitives/Editor/plugins/blockQuote/styles/blockQuoteStyles";
import { border, getColor, makeBorderBoxShadow } from "libs/styles";

import { htmlTextStyles } from "../FormattedHTMLText/htmlStyles";

export const editorStyles = css`
  .ck {
    .ck-toolbar__items {
      display: flex;
      flex-wrap: wrap !important;
    }

    &.ck-dropdown.ck-toolbar__grouped-dropdown.ck-toolbar-dropdown {
      display: none !important;
    }
    figure.image {
      margin: 0 auto;
    }

    &.ck-editor {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
      position: static;
    }

    &.ck-editor__top {
      width: 100%;
      border-bottom: 1px solid ${getColor("gray-blue/02")};
      z-index: 1;
      position: sticky;
      top: 0;

      .ck-sticky-panel__placeholder {
        height: 0 !important;
        opacity: 0 !important;
      }
      .ck-sticky-panel__content {
        position: static !important;
      }
    }
    &.ck-toolbar {
      background: white !important;
      border: none;
      display: flex;
      justify-content: center;

      &__items {
        justify-content: center;
        margin: 0 !important;
      }

      &.ck-toolbar_grouping .ck-toolbar__separator {
        align-self: center !important;
        height: 12px;
        width: 1px;
        background-color: ${getColor("gray-blue/02")};
        margin: 0 11px;
      }

      .ck-button {
        margin: 0 1px !important;
        padding: 4px !important;
        border-radius: 6px !important;
        border: none !important;
        box-shadow: none !important;
        cursor: pointer;
        &.ck-dropdown__button {
          .ck-icon.ck-dropdown__arrow {
            display: none !important;
          }
        }
        &:hover {
          background: ${getColor("blue/01")} !important;
        }
        svg {
          * {
            fill: ${getColor("gray-blue/07")} !important;
          }
          height: 24px !important;
          width: 24px !important;
        }
      }

      .ck-button.ck-on {
        background: ${getColor("blue/02")} !important;
        svg * {
          fill: ${getColor("blue/05")} !important;
        }
      }

      .custom-toolbar-button {
        outline: none !important;
      }

      .ck-dropdown {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }

      .ck-dropdown__panel {
        top: calc(100% + 6px) !important;
        background: white;
        ${border(1, "gray-blue/02")} !important;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04) !important;
        border-radius: 6px !important;
        overflow: auto;
        padding: 7px 8px !important;
      }

      .ck-insert-table-dropdown__label {
        color: ${getColor("gray-blue/05")};
        ${TypographyTypes["body-regular"]};
        margin-top: 8px;
        display: flex;
        height: 20px;
        justify-content: center;
        align-items: center;
      }

      .ck-insert-table-dropdown__grid {
        width: 140px !important;
        padding: 0 !important;
        border-radius: 6px;
        border: none !important;
        cursor: pointer;

        .ck-insert-table-dropdown-grid-box {
          background-color: ${getColor("gray-blue/01")};
          border-color: ${getColor("gray-blue/02")};
          width: 12px !important;
          height: 12px !important;
          border-radius: 2px !important;
        }

        .ck-insert-table-dropdown-grid-box.ck-on {
          background-color: ${getColor("blue/01")};
          border-color: ${getColor("blue/03")};
        }
      }

      .ck-heading-dropdown {
        min-width: 128px;
        height: 32px;
        margin: 0 1px;

        .ck-dropdown__button {
          min-width: 100% !important;
          min-height: 100% !important;
          padding: 4px 12px 4px 16px !important;

          ${TypographyTypes["button"]};

          color: ${getColor("gray-blue/07")};

          &:hover {
            background: ${getColor("gray-blue/01")} !important;
          }
          .ck-icon.ck-dropdown__arrow {
            margin-left: 8px;
            * {
              fill: ${getColor("gray-blue/07")} !important;
            }
            transition: transform 0.2s;
            display: block !important;
          }

          &.ck-on {
            transition: border 50ms !important;
            box-shadow: ${makeBorderBoxShadow([0, 0, 0, 2, "blue/04"])} !important;
            background: ${getColor("gray-blue/01")} !important;
            .ck-icon.ck-dropdown__arrow {
              transform: rotate(180deg);
            }
          }
        }

        .ck-dropdown__panel {
          width: 200px;
          overflow: auto !important;
        }

        .ck-list {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;

          &__item {
            width: 100%;
            min-width: 100% !important;
            height: 40px;
            margin: 1px 0;
          }

          &__item > .ck-button {
            ${TypographyTypes["body-regular"]};

            padding: 10px 8px !important;
            min-width: 100% !important;
            min-height: 100% !important;
            border-radius: 4px;
            color: ${getColor("gray-blue/9")};
          }

          &__item > .ck-button.ck-on,
          &__item > .ck-button:hover {
            color: ${getColor("gray-blue/10")};
            background-color: ${getColor("gray-blue/01")} !important;
          }

          .ck-heading_paragraph {
            ${TypographyTypes["body-regular"]};
          }
          .ck-heading_heading3 {
            ${TypographyTypes["h3-bold"]};
          }
          .ck-heading_heading2 {
            ${TypographyTypes["h2-bold"]};
          }
        }
      }
    }

    &.ck-editor__main {
      width: 100%;
      flex-grow: 1;
      padding: 16px;
      overflow-y: auto;
      box-sizing: border-box;

      &::-webkit-scrollbar-track {
        background: #ffffff;
      }

      & > .ck-editor__editable {
        width: 100%;
        max-width: 752px;
        min-height: 100%;
        padding: 40px 64px;
        margin: 0 auto;

        border: 1px solid ${getColor("gray-blue/02")} !important;
        border-radius: 6px !important;
        box-shadow: none !important;
        outline: none;
      }
    }

    figure.table {
      display: block;

      table,
      tbody,
      table .ck-editor__editable,
      table tr {
        border-color: ${getColor("gray-blue/02")} !important;
        border: none;
      }

      table {
        border: 1px solid;

        * {
          margin: 0;
        }

        .ck-editor__editable {
          ${TypographyTypes["body-regular"]};
          padding: 8px;
          &:not(:last-child) {
            border-right: 1px solid;
          }
        }

        tr:not(:last-child) {
          border-bottom: 1px solid;
        }
      }
    }

    ${htmlTextStyles}
  }

  .ck-dropdown__button {
    display: flex;
  }
  .ck-button_with-text {
    width: 100% !important;
  }

  .ck-list {
    margin: 0 !important;
    padding: 0 !important;
  }

  .ck-list__item {
    margin: 4px 0 !important;
  }

  .ck.ck-editor__editable pre[data-language]:after {
    padding: 4px 8px;
    background: ${getColor("gray-blue/02")};
    color: ${getColor("gray-blue/07")};
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    right: 8px;
    top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  ${blockQuoteStyles}
  ${blockQuoteCursorStyles}
`;
