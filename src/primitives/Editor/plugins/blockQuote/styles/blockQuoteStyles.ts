import { css } from "styled-components";
import { getColor } from "libs/styles";

export const blockQuoteStyles = css`
  .block-quote-wrapper-top-text {
    margin-left: 24px;
    width: 70%;
  }

  .block-quote-name {
    width: 100%;
    font-size: 32px;
    line-height: 1.3;
    color: ${getColor("gray/10")};
    text-decoration: none;
    font-weight: 500;
    word-break: break-word;

    & a {
      font-weight: 500;
      width: 100%;
      font-size: 32px;
      line-height: 1.3;
      color: ${getColor("gray/10")};
      text-decoration: none;
      word-break: break-word;
    }
  }

  .block-quote-position {
    font-weight: 500;
    width: 100%;
    text-decoration: none;
    font-size: 22px;
    line-height: 1.5;
    color: #637899;
    word-break: break-word;
  }

  .block-quote-container {
    position: relative;
    border: 1px solid #dbe3f0;
    box-sizing: border-box;
    box-shadow: 0 20px 40px rgb(99 120 153 / 8%);
    border-radius: 20px;
    padding: 48px 40px 88px;

    &:before {
      content: "";
      background: url("/quotes.svg");
      position: absolute;
      width: 30px;
      height: 24px;
      bottom: 52px;
      right: 40px;
    }
  }

  .block-quote-wrapper-top {
    display: flex;
    align-items: center;
  }

  .block-quote-image {
    border-radius: 50%;
    width: 80px;
    height: 80px;
  }
  .block-quote-text {
    font-weight: 500;
    margin-top: 24px;
    line-height: 1.5;
    color: #252525;

    & p {
      font-size: 18px;
      line-height: 1.5;
      padding: 0;
      margin: 0;
      word-break: break-word;
    }
  }

  .block-quote-picture {
    width: 80px;
    height: 80px;
  }

  .block-quote-wrapper-top {
    & figure .ck-widget__type-around {
      display: none !important;
    }

    & figure figcaption {
      display: none !important;
    }

    & figure {
      outline: none !important;
    }

    & figure img {
      border-radius: 50% !important;
      width: 80px !important;
      height: 80px !important;
    }

    & figure {
      margin: 0 !important;
    }
  }

  .ck-placeholder {
    border-bottom: 2px solid #dbe3f0 !important;
  }

  .block-quote-container {
    cursor: all-scroll;
  }
  .block-quote-text,
  .block-quote-position,
  .block-quote-name {
    cursor: text;
  }
  .block-quote-wrapper-top img {
    cursor: pointer;
  }

  .ck-widget__type-around__button_after,
  .ck-widget__type-around__button_before {
    cursor: pointer;
  }
`;
