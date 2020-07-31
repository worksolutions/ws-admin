import React, { Ref } from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";

import { child, flexValue, fullWidth, marginTop, overflowY, position } from "libs/styles";

import { ViewMetaData } from "../../types";
import { CardsViewConfigInterface } from "../types";

import CardsViewBlock from "./Cards";

interface CardsViewBlockWrapperInterface {
  notFound: React.ReactNode;
  spinner: React.ReactNode;
  options: CardsViewConfigInterface;
  setMetaData: (meta: ViewMetaData) => void;
}

function CardsViewBlockWrapper(
  { options, notFound, setMetaData, spinner }: CardsViewBlockWrapperInterface,
  ref: Ref<HTMLElement>,
) {
  return (
    <Wrapper
      ref={ref}
      styles={[
        fullWidth,
        flexValue(1),
        overflowY("scroll"),
        position("relative"),
        child(marginTop(0), ".cards-view-presenter"),
      ]}
    >
      {notFound}
      <CardsViewBlock {...options} onUpdateMeta={setMetaData} />
      {spinner}
    </Wrapper>
  );
}

export default React.memo(observer(CardsViewBlockWrapper, { forwardRef: true }));
