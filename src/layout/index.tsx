import React from "react";
import { matchPath, useLocation } from "react-router";

import Wrapper from "primitives/Wrapper";
import { Icons } from "primitives/Icon";

import { ai, Aligns, flex, fullHeight, marginLeft, width } from "libs/styles";
import { cb } from "libs/CB";

import { useDataSource } from "../modules/context/dataSource/useDataSource";

import MenuSidebar, { sidebarWidth } from "./MenuSidebar";

import { AnyDataSource } from "types/DataSource";

export default cb(
  {
    observer: true,
    useStateBuilder(props: { children: React.ReactNode; logo: string; sidebarDataSource: AnyDataSource }) {
      const { pathname } = useLocation();
      const [menuElements, setMenuElements] = React.useState<
        { code: string; name: string; icon: Icons; selected: boolean; href: string }[]
      >([]);

      const { data } = useDataSource(props.sidebarDataSource);
      React.useEffect(() => {
        if (!data) return;
        setMenuElements(
          data.map((item: any) => {
            const href = "/" + item.code;
            const selected = !!matchPath(pathname, { path: href });
            return { ...item, href, selected };
          }),
        );
      }, [data, pathname]);

      return { menuElements };
    },
  },
  function ({ children, logo }, { state: { menuElements } }) {
    return (
      <>
        <MenuSidebar
          logo={logo}
          primaryItems={menuElements.map((element) => ({
            type: "button",
            href: element.href,
            selected: element.selected,
            hint: element.name,
            icon: element.icon,
          }))}
          secondaryItems={[
            { href: "/a", selected: false, type: "button", icon: "arrow-up" },
            { href: "/a", selected: false, type: "button", icon: "arrow-up" },
            { href: "/a", selected: false, type: "button", icon: "arrow-up" },
          ]}
        />
        <Wrapper
          styles={[
            flex,
            fullHeight,
            marginLeft(sidebarWidth),
            width(`calc(100% - ${sidebarWidth}px)`),
            ai(Aligns.START),
          ]}
        >
          {children}
        </Wrapper>
      </>
    );
  },
);
