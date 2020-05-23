import React, { FC, useEffect } from "react";
import pageState from "state/page/state";
import { RouteComponentProps } from "react-router";

export default function <P>(Cmp: FC<P>) {
  return function (props: P & RouteComponentProps) {
    const {
      match: { params },
    } = props;
    const { updatePageState } = pageState.getState();
    useEffect(() => {
      updatePageState({ path: null, data: params });
      // eslint-disable-next-line
    }, [params]);
    return <Cmp {...(props as P)} />;
  };
}
