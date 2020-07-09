import React from "react";
import { browserHistory } from "common";
import { Container } from "typedi";

import { useSetDocumentTitle } from "libs/hooks";

import BlockRenderer from "./BlockRenderer";

import { ScreenInterface, SystemState } from "state/systemState";

const systemState = Container.get(SystemState);

interface ScreenModuleInterface {
  screen: ScreenInterface;
}

function Screen({ screen: { title, blocks } }: ScreenModuleInterface) {
  const { mainReference } = systemState.stateContainer.state;

  React.useEffect(() => {
    if (browserHistory.location.pathname === mainReference) return;
    browserHistory.replace(mainReference);
  }, []);

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
