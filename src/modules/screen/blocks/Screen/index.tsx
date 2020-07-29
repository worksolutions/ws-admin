import React from "react";
import { Route } from "react-router";

import { useSetDocumentTitle } from "libs/hooks";

import useScreenContextSynchronizer from "modules/context/hooks/useScreenContextSynchronizer";
import BlockRenderer from "modules/screen/BlockRenderer";

import { BlockInterface, ContainBlocksInterface } from "state/systemState";

export interface ScreenInterface {
  reference: string;
  title?: string;
}

function Component({ title, blocks }: { title?: string; blocks: BlockInterface[] }) {
  useSetDocumentTitle(title, 1);
  useScreenContextSynchronizer();

  return (
    <>
      {blocks.map((block, key) => (
        <BlockRenderer key={key} {...block} />
      ))}
    </>
  );
}

function Screen({ options, blocks }: BlockInterface<ScreenInterface> & ContainBlocksInterface) {
  return (
    <Route path={options!.reference} exact component={() => <Component blocks={blocks} title={options!.title} />} />
  );
}

export default React.memo(Screen);
