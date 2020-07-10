import React from "react";

import { useSetDocumentTitle } from "libs/hooks";

import BlockRenderer from "./BlockRenderer";

import { ScreenInterface } from "state/systemState";

interface ScreenModuleInterface {
  screen: ScreenInterface;
}

function Screen({ screen: { title, blocks } }: ScreenModuleInterface) {
  useSetDocumentTitle(title, 1);
  return (
    <>
      {blocks.map((block, key) => (
        <BlockRenderer key={key} {...block} />
      ))}
    </>
  );
}

export default React.memo(Screen);
