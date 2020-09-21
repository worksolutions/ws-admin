import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router";

import Wrapper from "primitives/Wrapper";
import Spinner from "primitives/Spinner";
import Tabs from "primitives/Tabs";
import Toggle from "primitives/Toggle";

import Sorting, { SortingElementInterface } from "components/Sorting";
import Sidebar from "components/Sidebar";

import { ai, Aligns, child, flex, flexColumn, fullHeight, fullWidth, jc, marginBottom, padding } from "libs/styles";

import { testItems } from "./testItems";
import Inputs from "./Inputs";
import Dropdowns from "./Dropdowns";
import DroppedListTest from "./DroppedListTest";
import Modals from "./Modals";
import RadioGroups from "./RadioGroups";
import Buttons from "./Buttons";
import Checkbox from "./Checkbox";
import TypographyList from "./TypographyList";

function TestPage() {
  const [sorting, setSorting] = React.useState<SortingElementInterface>({
    id: "new",
  });

  const [switched, setSwitched] = React.useState(false);

  return (
    <>
      <Sidebar title="Тест" items={testItems} />
      <Wrapper styles={[padding("16px 24px"), flex, ai(Aligns.CENTER), jc(Aligns.CENTER), fullWidth, fullHeight]}>
        <Switch>
          <Route path="/test/buttons*" component={() => <Buttons />} />
          <Route path="/test/input*" component={() => <Inputs />} />
          <Route path="/test/typography" component={() => <TypographyList />} />
          <Route path="/test/spinner" component={() => <Spinner />} />
          <Route path="/test/dropdown" component={() => <Dropdowns />} />
          <Route path="/test/dropped-list" component={() => <DroppedListTest />} />
          <Route path="/test/modal" component={() => <Modals />} />
          <Route path="/test/radio-group" component={() => <RadioGroups />} />
          <Route path="/test/checkbox" component={() => <Checkbox />} />
          <Route
            path="/test/toggle"
            component={() => (
              <Wrapper>
                <Toggle enabled={switched} onChange={setSwitched} />
                <Toggle text="asd" enabled={switched} onChange={setSwitched} />
                <Toggle textOnRight text="asd" enabled={switched} onChange={setSwitched} />
              </Wrapper>
            )}
          />
          <Route
            path="/test/sorting"
            component={() => (
              <Sorting
                items={[
                  { title: "по новизне", id: "new", hasDirection: false },
                  { title: "по дате создания", id: "date", hasDirection: true },
                ]}
                selected={sorting}
                onChange={(id, direction) => {
                  setSorting({ id, direction });
                }}
              />
            )}
          />
          <Route
            path="/test/tabs"
            component={() => (
              <Wrapper styles={[flex, flexColumn, child([flex, jc(Aligns.CENTER), marginBottom(50)])]}>
                <Tabs
                  items={[
                    { render: () => <div>1</div>, title: "Атрибуты" },
                    { render: () => <div />, title: "Текст" },
                    { render: () => <div />, title: "Статьи по теме" },
                  ]}
                />
              </Wrapper>
            )}
          />
        </Switch>
      </Wrapper>
    </>
  );
}

export default React.memo(observer(TestPage));
