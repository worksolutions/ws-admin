import React from "react";
import { Route, Switch } from "react-router";

import Wrapper from "primitives/Wrapper";

import { Aligns, child, flex, flexColumn, jc, margin, marginBottom } from "libs/styles";

import Primary from "./Primary";
import Loading from "./Loading";
import Icons from "./Icons";
import Secondary from "./Secondary";
import Ghost from "./Ghost";

function Index() {
  return (
    <Wrapper styles={[flex, child([flex, flexColumn, jc(Aligns.CENTER), margin(10), child(marginBottom(10))])]}>
      <Switch>
        <Route path="/test/buttons/primary" component={() => <Primary />} />
        <Route path="/test/buttons/loading" component={() => <Loading />} />
        <Route path="/test/buttons/icon" component={() => <Icons />} />
        <Route path="/test/buttons/secondary" component={() => <Secondary />} />
        <Route path="/test/buttons/ghost" component={() => <Ghost />} />
      </Switch>
    </Wrapper>
  );
}

export default Index;
