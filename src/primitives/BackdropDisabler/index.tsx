import ReactDOM from "react-dom";
import React from "react";

import Wrapper from "primitives/Wrapper";

import { bottom, left, position, right, top } from "libs/styles";

const rootElement = document.getElementById("root")!;

function BackdropDisabler() {
  return ReactDOM.createPortal(
    <Wrapper styles={[position("fixed"), left(0), right(0), top(0), bottom(0)]} />,
    rootElement,
  );
}

export default BackdropDisabler;
