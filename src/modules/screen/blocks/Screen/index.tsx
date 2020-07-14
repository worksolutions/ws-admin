import React from "react";
import { Route, Switch } from "react-router";

import { useSetDocumentTitle } from "libs/hooks";

import BlockRenderer from "../../BlockRenderer";

import { BlockInterface } from "state/systemState";

export interface ScreenInterface {
  reference: string;
  title?: string;
  blocks: BlockInterface[];
}

function Component({ title, blocks }: { title?: string; blocks: BlockInterface[] }) {
  useSetDocumentTitle(title, 1);
  return (
    <>
      {blocks.map((block, key) => (
        <BlockRenderer key={key} {...block} />
      ))}
    </>
  );
}

function Screen({ options }: BlockInterface<ScreenInterface>) {
  return (
    <Route
      path={options!.reference}
      exact
      component={() => <Component blocks={options!.blocks} title={options!.title} />}
    />
  );
}

export default React.memo(Screen);
