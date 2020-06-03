import React from "react";

import Wrapper from "primitives/Wrapper";

import { flex, fullHeight, fullWidth } from "libs/styles";

import PrimaryMenuSidebar from "./PrimaryMenuSidebar";
import SecondaryMenuSidebar from "./SecondaryMenuSidebar";

export default React.memo(function ({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper styles={[flex, fullWidth, fullHeight]}>
      <PrimaryMenuSidebar
        logo="/logo.svg"
        primaryItems={[
          { href: "/a", selected: true, type: "button", icon: "arrow-up" },
          { href: "/a", selected: false, type: "button", icon: "arrow-up", hint: "test" },
          { href: "/a", selected: false, type: "button", icon: "arrow-up" },
        ]}
        secondaryItems={[
          { href: "/a", selected: false, type: "button", icon: "arrow-up" },
          { href: "/a", selected: false, type: "button", icon: "arrow-up" },
          { href: "/a", selected: false, type: "button", icon: "arrow-up" },
        ]}
      />
      <SecondaryMenuSidebar opened={true} title="Title 123" items={[]} onChangeOpened={console.log} />
      {children}
    </Wrapper>
  );
});
