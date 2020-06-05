import React from "react";
import { useLocation, matchPath } from "react-router";

import Wrapper from "primitives/Wrapper";
import { Icons } from "primitives/Icon";

import { fullHeight, marginLeft, width } from "libs/styles";
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

      const data: any = useDataSource(props.sidebarDataSource);
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
        <Wrapper styles={[fullHeight, marginLeft(sidebarWidth), width(`calc(100% - ${sidebarWidth}px)`)]}>
          {children}
        </Wrapper>
      </>
    );
  },
);
