import { useEffect } from "react";
import { useParams } from "react-router";
import { Container } from "typedi";

import { PageState } from "state/pageState";

const pageState = Container.get(PageState);

export default function () {
  const params = useParams();
  useEffect(() => {
    pageState.stateContainer.mergeStates(params);
  }, [params]);
}
