import React from "react";
import { observer } from "mobx-react-lite";
import { duration200 } from "layout/durations";
import { elevation16 } from "style/shadows";

import LayoutGrid from "primitives/LayoutGrid";
import { CardImageConfig } from "primitives/Card/types";
import LinkWrapper from "primitives/LinkWrapper";
import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  ai,
  Aligns,
  child,
  color,
  disableDecoration,
  flex,
  fullHeight,
  horizontalPadding,
  hover,
  jc,
  marginTop,
  transition,
} from "libs/styles";

import { CardsViewDataSource } from "../types";

import CardComponent from "./CardComponent";

function CardsViewPresenter({ list, imageConfig }: { list: CardsViewDataSource; imageConfig: CardImageConfig }) {
  if (list.length === 0) {
    return (
      <Wrapper className="cards-view-presenter" styles={[flex, fullHeight, ai(Aligns.CENTER), jc(Aligns.CENTER)]}>
        <Typography color="gray-blue/05">Нет элементов для отображения</Typography>
      </Wrapper>
    );
  }

  return (
    <LayoutGrid
      className="cards-view-presenter"
      marginBottom={16}
      marginRight={16}
      minWidth={242}
      styles={[marginTop(16), horizontalPadding(8), ai(Aligns.STRETCH)]}
    >
      {list.map((card) => {
        const cardComponent = <CardComponent {...card} imageConfig={imageConfig} />;

        if (!card.redirectReference) return cardComponent;

        return (
          <LinkWrapper
            key={card.id}
            to={card.redirectReference}
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

export default React.memo(observer(CardsViewPresenter));
