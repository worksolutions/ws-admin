import ReactDOM from "react-dom";
import React from "react";
import { createGlobalStyle } from "styled-components";

import Wrapper from "primitives/Wrapper";

import { bottom, left, position, right, top } from "libs/styles";

const rootElement = document.getElementById("root")!;

const DisableSelect = createGlobalStyle`
* {
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none; 
       -moz-user-select: none;
        -ms-user-select: none; 
            user-select: none;
}`;

function BackdropDisabler({ styles }: { styles?: any }) {
  return ReactDOM.createPortal(
    <>
      <Wrapper styles={[position("fixed"), left(0), right(0), top(0), bottom(0), styles]} />
      <DisableSelect />
    </>,
    rootElement,
  );
}

export default React.memo(BackdropDisabler);
