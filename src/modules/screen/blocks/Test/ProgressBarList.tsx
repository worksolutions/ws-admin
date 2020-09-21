import React from "react";

import ProgressBar from "primitives/ProgressBar";
import Wrapper from "primitives/Wrapper";

import { flex, width } from "libs/styles";

export default function () {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => setProgress(progress + 0.005), 0.1);
    if (progress >= 1) clearInterval(interval);
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <Wrapper styles={[flex, width(200)]}>
      <ProgressBar value={progress} />
    </Wrapper>
  );
}
