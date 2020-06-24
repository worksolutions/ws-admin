import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Container } from "typedi";

import { ScreenState } from "state/screenState";

const screenState = Container.get(ScreenState);

export default function <P>(Cmp: FC<P>) {
  return function (props: P & RouteComponentProps) {
    const {
      match: { params },
    } = props;
    const [stateUpdated, setStateUpdated] = useState(false);

    useEffect(() => {
      screenState.stateContainer.mergeStates(params);
      setStateUpdated(true);
    }, [params]);

    if (!stateUpdated) {
      return null;
    }

    return <Cmp {...(props as P)} />;
  };
}
