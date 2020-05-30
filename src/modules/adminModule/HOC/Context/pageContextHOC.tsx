import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "react-router";

import { useToggle } from "libs/hooks";

import pageState from "state/page/state";

export default function <P>(Cmp: FC<P>) {
  return function (props: P & RouteComponentProps) {
    const {
      match: { params },
    } = props;
    const { _updatePageState } = pageState.getState();
    const [toggleVal, toggle] = useToggle(false);

    useEffect(() => {
      _updatePageState({ path: null, data: params });
      toggle();
      // eslint-disable-next-line
    }, [params]);

    if (!toggleVal) {
      return null;
    }
    return <Cmp {...(props as P)} />;
  };
}
