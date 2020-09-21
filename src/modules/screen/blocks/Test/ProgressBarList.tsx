import React from "react";

import ProgressBar from "primitives/ProgressBar";
import Wrapper from "primitives/Wrapper";

import { flex, width } from "libs/styles";

export default function () {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (progress >= 1) return;
    setProgress(progress + 0.01);
  }, [progress]);

  return (
    <Wrapper styles={[flex, width(200)]}>
      <ProgressBar value={progress} />
    </Wrapper>
  );
}
