import React from "react";

import { useSetDocumentTitle } from "libs/hooks";

import BlockRenderer from "./BlockRenderer";

import { PageInterface } from "state/systemState";

interface PageModuleInterface {
  page: PageInterface;
}

function Page({ page: { title, blocks } }: PageModuleInterface) {
  useSetDocumentTitle(title, 1);
  return (
    <>
      {blocks.map((block, key) => (
        <BlockRenderer key={key} {...block} />
      ))}
    </>
  );
}

export default React.memo(Page);
