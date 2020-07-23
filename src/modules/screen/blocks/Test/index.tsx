import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import Input from "primitives/Input/Input";
import Password from "primitives/Input/Password";
import DroppedList, { DroppedListOpenMode } from "primitives/List/DroppedList";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import { ListItemId } from "primitives/List";

import Sorting, { SortingElementInterface } from "components/Sorting";

import {
  ai,
  Aligns,
  borderRight,
  child,
  flex,
  flexColumn,
  flexWrap,
  marginBottom,
  marginRight,
  marginTop,
  padding,
  paddingRight,
} from "libs/styles";

import Buttons from "./Buttons";
import Dropdowns from "./Dropdowns";

function TestPage() {
  const [inputValue, setInputValue] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingElementInterface>({
    id: "new",
  });

  const [droppedItem, setDroppedItem] = React.useState<ListItemId>();

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
      <Buttons />

      <Wrapper>
        <Input
          tip="default"
          iconRight="bullseye-arrow"
          iconLeft="settings"
          placeholder="one"
          value={inputValue}
          onChange={setInputValue}
        />
        <Input tip="error" placeholder="one" error value={inputValue} onChange={setInputValue} />
        <Input tip="success" placeholder="one" success value={inputValue} onChange={setInputValue} />
        <Password placeholder="one" value={inputValue} onChange={setInputValue} />
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
      <Wrapper>
        <DroppedList
          mode={DroppedListOpenMode.HOVER}
          margin={4}
          items={[
            { title: "по новизне", id: "new" },
            { title: "по дате создания", id: "date" },
          ]}
          onChange={(id) => setDroppedItem(id)}
        >
          {(state, parentRef, subChild) => (
            <Button
              ref={parentRef}
              className="card-actions"
              type={ButtonType.ICON}
              size={ButtonSize.SMALL}
              iconLeft="kebab-horizontal"
              onClick={state.toggle}
            >
              {subChild}
            </Button>
          )}
        </DroppedList>
        <DroppedList
          mode={DroppedListOpenMode.CLICK}
          margin={4}
          items={[
            { title: "по новизне", id: "new" },
            { title: "по дате создания", id: "date" },
          ]}
          onChange={(id) => setDroppedItem(id)}
        >
          {(state, parentRef, subChild) => (
            <Button
              styles={marginTop(50)}
              ref={parentRef}
              className="card-actions"
              type={ButtonType.ICON}
              size={ButtonSize.SMALL}
              iconLeft="kebab-horizontal"
              onClick={state.toggle}
            >
              {subChild}
            </Button>
          )}
        </DroppedList>
      </Wrapper>
      <Dropdowns />
    </Wrapper>
  );
}

export default React.memo(observer(TestPage));
