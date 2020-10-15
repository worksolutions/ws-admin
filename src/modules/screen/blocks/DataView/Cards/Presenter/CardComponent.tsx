import React from "react";
import { observer } from "mobx-react-lite";

import { CardImageConfig } from "primitives/Card/types";
import Card from "primitives/Card";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import { CardsViewDataSource } from "../types";

import { AnyRawAction } from "types/Actions";

function CardComponent(card: CardsViewDataSource[0] & { imageConfig: CardImageConfig; index: number }) {
  const { id, statuses, actions, heading, title, image, imageConfig } = card;
  const appContext = useAppContext();

  const memoizedActions = React.useMemo(() => {
    const result: Record<string, AnyRawAction> = {};
    actions?.forEach((action, index) => {
      result[index.toString()] = action.action;
    });
    return result;
  }, [actions]);

  const patchedActions = useActions(memoizedActions, appContext);

  return (
    <Card
      statuses={statuses}
      actions={actions?.map((action, index) => ({
        ...action,
        loading: patchedActions[index].loadingContainer.loading,
        handler: () => patchedActions[index].run({ index: card.index }),
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
