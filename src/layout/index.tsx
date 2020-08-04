import React from "react";
import { matchPath, useLocation } from "react-router";
import { Container } from "typedi";

import Wrapper from "primitives/Wrapper";
import { Icons } from "primitives/Icon";

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
} from "libs/styles";
import { cb } from "libs/CB";

import { useDataSource } from "../modules/context/dataSource/useDataSource";
import Modal from "../primitives/Modal";
import { browserHistory } from "../common";

import MenuSidebar, { sidebarWidth } from "./MenuSidebar";

import { GlobalState } from "state/globalState";

import { AnyDataSource } from "types/DataSource";

const globalState = Container.get(GlobalState);

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
    const currentUser = globalState.stateContainer.state.currentUser;
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
            currentUser
              ? {
                  href: "/user",
                  selected: false,
                  type: "button",
                  hint: globalState.stateContainer.state.currentUser.name,
                  iconStyles: [borderRadius("100%"), border(1, createAlphaColor("black", 20))],
                  icon: globalState.stateContainer.state.currentUser.avatar || "user",
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
            { href: "/settings", selected: false, type: "button", icon: "settings" },
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
          {currentUser && children}
        </Wrapper>
      </>
    );
  },
);
