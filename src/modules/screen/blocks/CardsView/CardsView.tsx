import React from "react";
import { observer } from "mobx-react-lite";

import Card from "primitives/Card";
import LayoutGrid from "primitives/LayoutGrid";

import { ai, Aligns, padding } from "libs/styles";

import { CardsViewDataSource } from "./types";

function CardsView({ list, imageConfig }: CardsViewDataSource & { onCardClick: (card: Record<string, any>) => void }) {
  return (
    <LayoutGrid
      marginBottom={16}
      marginRight={16}
      minWidth={242}
      styles={[padding("20px 12px 4px 12px"), ai(Aligns.STRETCH)]}
    >
      {list.map((card) => {
        const { id, statuses, actions, heading, title, image } = card;

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
      })}
    </LayoutGrid>
  );
}

export default React.memo(observer(CardsView));
