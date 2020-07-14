import React from "react";
import { observer } from "mobx-react-lite";
import { duration200 } from "layout/durations";
import { elevation16 } from "style/shadows";

import Card from "primitives/Card";
import LayoutGrid from "primitives/LayoutGrid";
import { CardImageConfig, CardInterface } from "primitives/Card/types";
import LinkWrapper from "primitives/LinkWrapper";

import { ai, Aligns, child, disableDecoration, fullHeight, hover, padding, transition } from "libs/styles";

import { insertContext } from "modules/context/insertContext";
import { useAppContext } from "modules/context/hooks/useAppContext";

import { CardsViewDataSource } from "./types";

function createCardComponent(
  { id, statuses, actions, heading, title, image }: CardInterface,
  imageConfig: CardImageConfig,
) {
  return (
    <Card
      key={id}
      statuses={statuses}
      actions={actions}
      heading={heading}
      title={title}
      image={image}
      imageConfig={imageConfig}
      id={id}
    />
  );
}

function CardsView({
  list,
  clickRedirectToReference,
  imageConfig,
}: CardsViewDataSource & {
  clickRedirectToReference?: string;
  imageConfig: CardImageConfig;
}) {
  const appContext = useAppContext();

  return (
    <LayoutGrid
      marginBottom={16}
      marginRight={16}
      minWidth={242}
      styles={[padding("20px 12px 4px 12px"), ai(Aligns.STRETCH)]}
    >
      {list.map((card) => {
        const cardComponent = createCardComponent(card, imageConfig);
        if (!clickRedirectToReference) return cardComponent;

        return (
          <LinkWrapper
            key={card.id}
            to={insertContext(clickRedirectToReference, appContext.context, card)}
            styles={[disableDecoration, child([fullHeight, transition(`all ${duration200}`), hover(elevation16)])]}
          >
            {cardComponent}
          </LinkWrapper>
        );
      })}
    </LayoutGrid>
  );
}

export default React.memo(observer(CardsView));
