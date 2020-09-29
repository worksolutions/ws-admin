import React from "react";
import { observer } from "mobx-react-lite";
import { duration160 } from "layout/durations";
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
  marginBottom,
  transition,
} from "libs/styles";

import { CardsViewDataSource } from "../types";

import CardComponent from "./CardComponent";

function CardsViewPresenter({ list, imageConfig }: { list: CardsViewDataSource; imageConfig: CardImageConfig }) {
  if (list.length === 0) {
    return (
      <Wrapper styles={[flex, fullHeight, ai(Aligns.CENTER), jc(Aligns.CENTER)]}>
        <Typography color="gray-blue/05">Нет элементов для отображения</Typography>
      </Wrapper>
    );
  }

  return (
    <LayoutGrid
      eachChildStyles={marginBottom(16)}
      marginBetweenElements={16}
      minWidth={242}
      styles={[horizontalPadding(16), ai(Aligns.STRETCH)]}
    >
      {list.map((card) => {
        const cardComponent = <CardComponent key={card.id} {...card} imageConfig={imageConfig} />;

        if (!card.redirectReference) return cardComponent;

        return (
          <LinkWrapper
            key={card.id}
            to={card.redirectReference}
            styles={[
              disableDecoration,
              child([
                fullHeight,
                transition(`all ${duration160}`),
                hover([elevation16, child([transition(`all ${duration160}`), color("gray-blue/07")], ".card-title")]),
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
