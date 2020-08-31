import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonType } from "primitives/Button";
import Tabs from "primitives/Tabs";
import Spinner from "primitives/Spinner";
import Toggle from "primitives/Toggle";
import Typography from "primitives/Typography";

import Sorting, { SortingElementInterface } from "components/Sorting";

import {
  ai,
  Aligns,
  backgroundColor,
  borderRight,
  child,
  flex,
  flexColumn,
  flexWrap,
  height,
  marginBottom,
  marginRight,
  padding,
  paddingRight,
  width,
} from "libs/styles";

import Buttons from "./Buttons";
import Dropdowns from "./Dropdowns";
import Modals from "./Modals";
import RadioGroups from "./RadioGroups";
import Inputs from "./Inputs";
import DroppedListTest from "./DroppedListTest";

function TestPage() {
  const [sorting, setSorting] = React.useState<SortingElementInterface>({
    id: "new",
  });

  const [switched, setSwitched] = React.useState(false);

  return (
    <Wrapper
      styles={[
        padding("16px 24px"),
        flex,
        child([
          marginRight(6),
          marginBottom(6),
          borderRight(1, "gray-blue/09"),
          paddingRight(6),
          ai(Aligns.START),
          flex,
          flexColumn,
          child(marginBottom(6)),
        ]),
        flexWrap,
      ]}
    >
      <Wrapper>
        <Spinner />
        <Button loading onClick={console.log}>
          Авторизация
        </Button>
        <Button loading disabled iconLeft="delete" onClick={console.log}>
          Автор
        </Button>
        <Button loading disabled type={ButtonType.SECONDARY} iconLeft="delete" onClick={console.log}>
          Автор
        </Button>
        <Button loading disabled type={ButtonType.GHOST} iconLeft="delete" onClick={console.log}>
          Автор
        </Button>
      </Wrapper>
      <Buttons />

      <Wrapper>
        <Inputs />
      </Wrapper>

      <Wrapper>
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
      </Wrapper>
      <DroppedListTest />
      <Dropdowns />
      <Wrapper>
        <Wrapper>
          <Tabs
            items={[
              {
                render: () => (
                  <Wrapper styles={[width(200), height(100), backgroundColor("red/03")]}>
                    <Typography>1</Typography>
                  </Wrapper>
                ),
                title: "Атрибуты",
              },
              {
                render: () => (
                  <Wrapper styles={[width(200), height(100), backgroundColor("green/03")]}>
                    <Typography>2</Typography>
                  </Wrapper>
                ),
                title: "Текст",
              },
              {
                render: () => (
                  <Wrapper styles={[width(200), height(100), backgroundColor("blue/03")]}>
                    <Typography>3</Typography>
                  </Wrapper>
                ),
                title: "Статьи по теме",
              },
            ]}
          />
        </Wrapper>
      </Wrapper>
      <Wrapper>
        <Modals />
      </Wrapper>
      <Wrapper>
        <RadioGroups />
      </Wrapper>
      <Wrapper>
        <Toggle enabled={switched} onChange={setSwitched} />
        <Toggle text="asd" enabled={switched} onChange={setSwitched} />
        <Toggle textOnRight text="asd" enabled={switched} onChange={setSwitched} />
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(observer(TestPage));
