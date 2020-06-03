import React from "react";
import { useLocation, matchPath } from "react-router";

import Wrapper from "primitives/Wrapper";

import { flex, fullHeight, fullWidth } from "libs/styles";

import PrimaryMenuSidebar from "./PrimaryMenuSidebar";
import SecondaryMenuSidebar from "./SecondaryMenuSidebar";

import { PrimarySideMenuDataSourceInterface } from "state/systemState";

export default React.memo(function ({
  children,
  logo,
  primarySidebarDataSource,
}: {
  children: React.ReactNode;
  logo: string;
  primarySidebarDataSource: PrimarySideMenuDataSourceInterface;
}) {
  const { pathname } = useLocation();
  return (
    <Wrapper styles={[flex, fullWidth, fullHeight]}>
      <PrimaryMenuSidebar
        logo={logo}
        primaryItems={primarySidebarDataSource.options.map((element) => {
          const selected = !!matchPath(pathname, {
            path: element.to,
            exact: true,
          });
          return {
            type: "button",
            selected,
            href: element.to,
            hint: element.hint,
            icon: element.icon,
          };
        })}
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
