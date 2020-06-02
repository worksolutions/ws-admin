import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Container } from "typedi";

import { PageState } from "state/pageState";

const pageState = Container.get(PageState);

export default function <P>(Cmp: FC<P>) {
  return function (props: P & RouteComponentProps) {
    const {
      match: { params },
    } = props;
    const [stateUpdated, setStateUpdated] = useState(false);

    useEffect(() => {
      pageState.stateContainer.mergeStates(params);
      setStateUpdated(true);
    }, [params]);

    if (!stateUpdated) {
      return null;
    }

    return <Cmp {...(props as P)} />;
  };
}
