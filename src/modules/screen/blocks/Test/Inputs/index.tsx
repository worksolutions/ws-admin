import { Route, Switch } from "react-router";
import React from "react";

import Wrapper from "primitives/Wrapper";

import { Aligns, child, flex, flexColumn, jc, margin, marginBottom } from "libs/styles";

import Masked from "./Masked";
import Multiline from "./Multiline";
import OneLine from "./OneLine";

export default function Index() {
  return (
    <Wrapper styles={[flex, child([flex, flexColumn, jc(Aligns.CENTER), margin(10), child(marginBottom(10))])]}>
      <Switch>
        <Route path="/test/input/masked" component={() => <Masked />} />
        <Route path="/test/input/multiline" component={() => <Multiline />} />
        <Route path="/test/input/one-line" component={() => <OneLine />} />
      </Switch>
    </Wrapper>
  );
}
