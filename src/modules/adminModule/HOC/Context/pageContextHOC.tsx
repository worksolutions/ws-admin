import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import pageState from "state/page/state";

export default function <P>(Cmp: FC<P>) {
  return function (props: P & RouteComponentProps) {
    const {
      match: { params },
    } = props;
    const { _updatePageState } = pageState.getState();
    const [stateUpdated, setStateUpdated] = useState(false);

    useEffect(() => {
      _updatePageState({ path: null, data: params });
      setStateUpdated(true);
      // eslint-disable-next-line
    }, [params]);

    if (!stateUpdated) {
      return null;
    }
    return <Cmp {...(props as P)} />;
  };
}
