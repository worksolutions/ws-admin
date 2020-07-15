import React from "react";
import { observer } from "mobx-react-lite";
import { duration200 } from "layout/durations";
import { elevation16 } from "style/shadows";

import LayoutGrid from "primitives/LayoutGrid";
import { CardImageConfig } from "primitives/Card/types";
import LinkWrapper from "primitives/LinkWrapper";

import { ai, Aligns, child, color, disableDecoration, fullHeight, hover, padding, transition } from "libs/styles";

import { insertContext } from "modules/context/insertContext";
import { useAppContext } from "modules/context/hooks/useAppContext";

import { CardsViewDataSource } from "./types";
import CardComponent from "./CardComponent";

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
        const cardComponent = <CardComponent {...card} imageConfig={imageConfig} />;

        if (!clickRedirectToReference) return cardComponent;
        return (
          <LinkWrapper
            key={card.id}
            to={insertContext(clickRedirectToReference, appContext.context, card)}
            styles={[
              disableDecoration,
              child([
                fullHeight,
                transition(`all ${duration200}`),
                hover([elevation16, child([transition(`all ${duration200}`), color("gray-blue/07")], ".card-title")]),
              ]),
            ]}
          >
            {cardComponent}
          </LinkWrapper>
        );
      })}
    </LayoutGrid>
  );
}

export default React.memo(observer(CardsView));
