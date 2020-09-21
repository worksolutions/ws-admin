import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router";

import Wrapper from "primitives/Wrapper";
import Spinner from "primitives/Spinner";

import Sidebar from "components/Sidebar";

import { ai, Aligns, flex, fullHeight, fullWidth, jc, padding } from "libs/styles";

import { testItems } from "./testItems";
import Inputs from "./Inputs";
import Dropdowns from "./Dropdowns";
import DroppedListTest from "./DroppedListTest";
import Modals from "./Modals";
import RadioGroups from "./RadioGroups";
import Buttons from "./Buttons";
import Checkbox from "./Checkbox";
import TypographyList from "./TypographyList";
import Toggle from "./Toggle";
import Sorting from "./Sorting";
import Tabs from "./Tabs";
import ProgressBarList from "./ProgressBarList";

function TestPage() {
  return (
    <>
      <Sidebar title="Тест" items={testItems} />
      <Wrapper styles={[padding("16px 24px"), flex, ai(Aligns.CENTER), jc(Aligns.CENTER), fullWidth, fullHeight]}>
        <Switch>
          <Route path="/test/buttons*" component={Buttons} />
          <Route path="/test/input*" component={Inputs} />
          <Route path="/test/typography" component={TypographyList} />
          <Route path="/test/spinner" component={Spinner} />
          <Route path="/test/dropdown" component={Dropdowns} />
          <Route path="/test/dropped-list" component={DroppedListTest} />
          <Route path="/test/modal" component={Modals} />
          <Route path="/test/radio-group" component={RadioGroups} />
          <Route path="/test/checkbox" component={Checkbox} />
          <Route path="/test/toggle" component={Toggle} />
          <Route path="/test/sorting" component={Sorting} />
          <Route path="/test/tabs" component={Tabs} />
          <Route path="/test/progress-bar" component={ProgressBarList} />
        </Switch>
      </Wrapper>
    </>
  );
}

export default React.memo(observer(TestPage));
