import { css } from "styled-components";

import { getColor } from "libs/styles";

import { htmlStyles } from "../FormattedHTMLText/htmlStyles";

export const editorStyles = css`
  .ck.ck-editor {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    position: static;
  }

  .ck.ck-editor__main {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-grow: 1;
    padding: 16px;
  }

  .ck.ck-editor__top {
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

  .ck.ck-toolbar {
    &__items {
      height: 39px;
    }
    background: white !important;
    border: none;
  }

  .ck-editor__main .ck-editor__editable {
    width: 100%;
    max-width: 752px;
    min-height: 100%;
    padding: 40px 64px;

    border: 1px solid ${getColor("gray-blue/02")} !important;
    border-radius: 6px !important;
    box-shadow: none !important;
    outline: none;
  }

  .ck-editor__editable {
    ${htmlStyles}
  }
`;
