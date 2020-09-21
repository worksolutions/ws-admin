import React from "react";
import { observer } from "mobx-react-lite";

import Button from "primitives/Button";

import globalEventBus from "modules/globalEventBus";

function ToastList() {
  return (
    <>
      <Button onClick={() => globalEventBus.emit("ADD_TOAST", { text: "hello" })}>Default</Button>
      <Button onClick={() => globalEventBus.emit("ADD_TOAST", { text: "hello errored", error: true })}>Error</Button>
    </>
  );
}

export default React.memo(observer(ToastList));
