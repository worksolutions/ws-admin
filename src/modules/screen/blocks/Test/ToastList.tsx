import React from "react";
import { observer } from "mobx-react-lite";

import Button from "primitives/Button";
import Wrapper from "primitives/Wrapper";

import { child, margin } from "libs/styles";

import globalEventBus from "modules/globalEventBus";

function ToastList() {
  return (
    <Wrapper styles={[child(margin(20))]}>
      <Button onClick={() => globalEventBus.emit("ADD_TOAST", { text: "hello" })}>Default</Button>
      <Button onClick={() => globalEventBus.emit("ADD_TOAST", { text: "hello errored", error: true })}>Error</Button>
      <Button
        onClick={() =>
          globalEventBus.emit("ADD_TOAST", {
            text: "hello errored",
            cancelButton: {
              onClick: console.log,
              text: "Отмена123",
            },
          })
        }
      >
        Cancel
      </Button>
    </Wrapper>
  );
}

export default React.memo(observer(ToastList));
