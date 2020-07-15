import React from "react";
import { observer } from "mobx-react-lite";

import { CardImageConfig } from "primitives/Card/types";
import Card from "primitives/Card";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import { CardsViewDataSource } from "./types";

import { AnyAction } from "types/Actions";

function CardComponent(card: CardsViewDataSource["list"][0] & { imageConfig: CardImageConfig }) {
  const { id, statuses, actions, heading, title, image, imageConfig } = card;
  const appContext = useAppContext();

  const patchedActions = useActions(
    React.useMemo(() => {
      const result: Record<string, AnyAction> = {};
      actions?.forEach((action, index) => {
        result[index.toString()] = action.action;
      });
      return result;
    }, []),
    appContext,
  );

  return (
    <Card
      key={id}
      statuses={statuses}
      actions={actions?.map((action, actionIndex) => ({
        ...action,
        loading: patchedActions[actionIndex].loadingContainer.loading,
        handler: () => patchedActions[actionIndex].run(card),
      }))}
      heading={heading}
      title={title}
      image={image}
      imageConfig={imageConfig}
      id={id}
    />
  );
}

export default React.memo(observer(CardComponent));
