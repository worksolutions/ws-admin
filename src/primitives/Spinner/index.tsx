import React from "react";
import styled from "styled-components";

import { borderLeftColor, Colors, getColor } from "libs/styles";

import "./style.css";

interface SpinnerInterface {
  color?: Colors;
  className?: string;
}

const StyledSpinner = styled.div.attrs({ className: "loader" })<Required<SpinnerInterface>>`
  .path {
    stroke: ${(props) => getColor(props.color)};
  }
`;

const Spinner = function (props: SpinnerInterface) {
  return (
    <StyledSpinner {...(props as any)}>
      <svg className="circular" viewBox="25 25 50 50">
        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
      </svg>
    </StyledSpinner>
  );
};

Spinner.defaultProps = {
  color: "gray-blue/09",
};

export default React.memo(Spinner);

export const makeSpinnerColorStyle = (color: Colors) => borderLeftColor(color);
