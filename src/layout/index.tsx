import React from "react";

import Wrapper from "primitives/Wrapper";

import { cb } from "libs/CB";
import { flex, fullHeight, fullWidth, position } from "libs/styles";

import PrimaryMenuSidebar from "./PrimaryMenuSidebar";
import SecondaryMenuSidebar from "./SecondaryMenuSidebar";

export default cb({ useStateBuilder: () => ({}) }, function () {
  return (
    <Wrapper styles={[flex, fullWidth, fullHeight, position("relative")]}>
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
    </Wrapper>
  );
});
