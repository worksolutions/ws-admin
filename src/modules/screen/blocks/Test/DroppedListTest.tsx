import React from "react";

import DroppedList, { DroppedListOpenMode } from "primitives/List/DroppedList";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import Wrapper from "primitives/Wrapper";
import { ListItemId } from "primitives/List";

import { marginTop } from "libs/styles";

function DroppedListTest() {
  const [droppedItem, setDroppedItem] = React.useState<ListItemId>();
  return (
    <Wrapper>
      <DroppedList
        mode={DroppedListOpenMode.HOVER}
        selectedItemId={droppedItem}
        margin={4}
        items={[
          { title: "по новизне", code: "new" },
          { title: "по дате создания", code: "date" },
        ]}
        onChange={(code) => setDroppedItem(code)}
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
        selectedItemId={droppedItem}
        mode={DroppedListOpenMode.CLICK}
        margin={4}
        items={[
          { title: "по новизне", code: "new" },
          { title: "по дате создания", code: "date" },
        ]}
        onChange={(code) => setDroppedItem(code)}
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
  );
}

export default DroppedListTest;
