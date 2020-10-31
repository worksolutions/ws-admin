import React from "react";
import { matchPath, useLocation } from "react-router";
import { Container } from "typedi";
import { assoc } from "ramda";

import Wrapper from "primitives/Wrapper";
import { Icons } from "primitives/Icon";
import Modal from "primitives/Modal";

import {
  ai,
  Aligns,
  border,
  borderRadius,
  createAlphaColor,
  flex,
  fullHeight,
  marginLeft,
  pointer,
  width,
  zIndex,
} from "libs/styles";
import { cb } from "libs/CB";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { browserHistory } from "../common";

import MenuSidebar, { sidebarWidth } from "./MenuSidebar";

import { GlobalState } from "state/globalState";

import { AnyDataSource } from "types/DataSource";

const globalState = Container.get(GlobalState);

type SidebarItem = { matchPath: string; redirectReference: string; name: string; icon: Icons };

export default cb(
  {
    observer: true,
    useStateBuilder(props: { children: React.ReactNode; logo: string; sidebarDataSource: AnyDataSource }) {
      const { pathname } = useLocation();
      const [menuElements, setMenuElements] = React.useState<(SidebarItem & { selected: boolean })[]>([]);

      const { data } = useDataSource<SidebarItem[]>(props.sidebarDataSource);

      React.useEffect(() => {
        if (!data) return;
        setMenuElements(
          data.map((item) => {
            const selected = !!matchPath(pathname, { path: item.matchPath });
            return assoc("selected", selected, item);
          }),
        );
      }, [data, pathname]);

      return { menuElements, pathname };
    },
  },
  function ({ children, logo }, { state: { menuElements, pathname } }) {
    const { currentUser } = globalState.stateContainer.state;
    return (
      <>
        <MenuSidebar
          logo={logo}
          primaryItems={menuElements.map((element) => ({
            type: "button",
            href: element.redirectReference,
            selected: element.selected,
            hint: element.name,
            icon: element.icon,
          }))}
          secondaryItems={[
            currentUser
              ? {
                  href: "/me",
                  selected: !!matchPath(pathname, { path: "/me" }),
                  type: "button",
                  hint: currentUser.name + (currentUser.postName ? ` (${currentUser.postName})` : ""),
                  iconStyles: [borderRadius("100%"), border(1, createAlphaColor("black", 20))],
                  icon: currentUser.avatar || "user",
                }
              : null,
            {
              selected: false,
              type: "button",
              hint: "Выйти из системы",
              icon: "log-out",
              customElement: (ref, iconElement, resultStyles) => (
                <Modal
                  title="Выход из системы"
                  subTitle="Вы уверены, что хотите выйти из системы?"
                  actionsInColumn
                  primaryActionText="Выйти"
                  onPrimaryAction={(close) => {
                    close();
                    browserHistory.replace("/logout");
                  }}
                  secondaryActionText="Отменить"
                  onSecondaryAction={(close) => close()}
                  wrappedContent={(open) => (
                    <Wrapper ref={ref} onClick={open} styles={[resultStyles, pointer]}>
                      {iconElement}
                    </Wrapper>
                  )}
                />
              ),
            },
          ]}
        />
        <Wrapper
          styles={[
            flex,
            fullHeight,
            marginLeft(sidebarWidth),
            width(`calc(100% - ${sidebarWidth}px)`),
            ai(Aligns.START),
            zIndex(1),
          ]}
        >
          {currentUser && children}
        </Wrapper>
      </>
    );
  },
);
