import React, { ReactNode } from "react";

import Wrapper from "primitives/Wrapper";

export default React.memo(function (props: { children: ReactNode } & Record<string, any>) {
  return <Wrapper as="tbody" {...props} />;
});
