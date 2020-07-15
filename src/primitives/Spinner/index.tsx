import React from "react";
import styled from "styled-components";

import { Colors, getColor } from "libs/styles";

import "./style.css";

interface SpinnerInterface {
  size?: number;
  color?: Colors;
  className?: string;
}

const StyledSpinner = styled.div.attrs({ className: "loader" })<Required<SpinnerInterface>>`
  border: ${(props) => props.size / 10}px solid transparent;
  border-left-color: ${(props) => getColor(props.color)};
  &,
  :after {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
  }
`;

const Spinner = function (props: SpinnerInterface) {
  return <StyledSpinner {...(props as any)} />;
};

Spinner.defaultProps = {
  size: 24,
  color: "gray-blue/09",
};

export default React.memo(Spinner);
