import React from "react";
import Prism from "prismjs";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";

import {
  Aligns,
  backgroundColor,
  border,
  borderRadius,
  flex,
  fullWidth,
  jc,
  maxWidth,
  minHeight,
  overflow,
  padding,
} from "libs/styles";
import { BlockInterface } from "state/globalState";
import { useDataSource } from "modules/context/dataSource/useDataSource";

import BlockRenderer from "../../BlockRenderer";

import { htmlStyles } from "./htmlStyles";
import { modifyTextWithEnhancers } from "./enhancers";
import { DEFAULT_LANGUAGE, getLanguage, htmlCodeFormat } from "../../../../libs/prism";

function FormattedHTMLText({ styles, dataSource }: BlockInterface<{ value: string }> & { styles?: any }) {
  const { data: text } = useDataSource(dataSource!);

  const ref = React.useRef<HTMLDivElement>();
  const enhancers = React.useMemo(() => modifyTextWithEnhancers(text || ""), [text]);

  React.useEffect(() => {
    ref.current!.innerHTML = enhancers.text;
    ref.current!.querySelectorAll("pre code").forEach((element) => {
      const language = getLanguage(element.className);
      element.setAttribute("data-language-text", (language || DEFAULT_LANGUAGE).toUpperCase());
      if (!language) return;

      element.innerHTML = Prism.highlight(htmlCodeFormat(element.innerHTML), Prism.languages[language], language);
    });
  }, [text]);

  return (
    <>
      <Wrapper
        styles={[backgroundColor("gray-blue/01"), padding(16), flex, jc(Aligns.CENTER), minHeight("100%"), styles]}
      >
        <Wrapper
          ref={ref}
          styles={[
            fullWidth,
            maxWidth(752),
            backgroundColor("white"),
            border(1, "gray-blue/02"),
            padding("40px 64px 8px 64px"),
            borderRadius(6),
            overflow("hidden"),
            htmlStyles,
          ]}
        />
      </Wrapper>
      {enhancers.enhancers.map((enhancer, key) => (
        <BlockRenderer key={key} type={`FormattedHTMLText/enhancers/${enhancer.name}`} options={enhancer} />
      ))}
    </>
  );
}

export default observer(FormattedHTMLText);
