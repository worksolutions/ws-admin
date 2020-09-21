import React from "react";

import ProgressBar from "primitives/ProgressBar";
import Wrapper from "primitives/Wrapper";

import { Aligns, child, flex, flexColumn, jc, margin, marginBottom } from "libs/styles";

export default function f() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (progress >= 1) {
      setProgress(0);
      return;
    }
    setProgress(progress + 0.02);
  }, [progress]);

  return (
    <Wrapper styles={[flex, child([flex, flexColumn, jc(Aligns.CENTER), margin(10), child(marginBottom(10))])]}>
      <ProgressBar value={progress} />
    </Wrapper>
  );
}
