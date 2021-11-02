import React, { Ref, useCallback, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";

import { background, flexValue, fullWidth, overflowY, position } from "libs/styles";

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
  const wrapperRef = React.useRef<HTMLElement | null>();

  const createRef = useCallback((wrapRef) => {
    wrapperRef.current = wrapRef;
    // @ts-ignore
    ref(wrapRef);
  }, []);

  useEffect(() => {
    if (spinner === false) {
      wrapperRef.current?.scrollTo(0, 0);
    }
  }, [spinner]);

  return (
    <Wrapper ref={createRef} styles={[fullWidth, flexValue(1), overflowY("auto"), position("relative")]}>
      {notFound}
      <CardsViewBlock {...options} onUpdateMeta={setMetaData} />
      {spinner}
    </Wrapper>
  );
}

export default React.memo(observer(CardsViewBlockWrapper, { forwardRef: true }));
