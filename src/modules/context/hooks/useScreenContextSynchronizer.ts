import { useEffect } from "react";
import { useParams } from "react-router";
import { Container } from "typedi";

import { ScreenState } from "state/screenState";

const screenState = Container.get(ScreenState);

export default function () {
  const params = useParams();
  useEffect(() => {
    screenState.stateContainer.mergeStates(params);
  }, [params]);
}
