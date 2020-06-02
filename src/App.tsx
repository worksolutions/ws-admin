import "reflect-metadata";
import React, { useEffect } from "react";
import { AppBar, CircularProgress } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { Route, Switch } from "react-router";
import { Container } from "typedi";
import { observer } from "mobx-react-lite";

import { createAdminComponent } from "modules/componentBuilder";
import DrawerMenu from "modules/components/DrawerMenu";
import AdminPage from "modules/components/AdminPage";

import { SystemState } from "state/systemState";

const systemState = Container.get(SystemState);

function App() {
  const WrappedDrawerMenu = createAdminComponent(DrawerMenu, {});

  useEffect(() => {
    systemState.loadConfig();
    // eslint-disable-next-line
  }, []);

  const state = systemState.stateContainer.state;

  if (!state.sideMenu) {
    return <CircularProgress />;
  }

  return (
    <WrappedDrawerMenu
      dataSource={state.sideMenu.dataSource}
      content={(openMenu: any) => (
        <>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton color="inherit" aria-label="open drawer" onClick={openMenu} edge="start">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">
                {state.title || (
                  <Skeleton
                    variant="text"
                    width={700}
                    height={50}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, .3)",
                    }}
                  />
                )}
              </Typography>
            </Toolbar>
          </AppBar>
          <Switch>
            {state.pages.map((page: any) => (
              <Route
                key={page.pageUrl}
                exact
                path={page.pageUrl}
                // @ts-ignore
                render={(props) => <AdminPage {...props} settings={page} />}
              />
            ))}
          </Switch>
        </>
      )}
    />
  );
}

export default React.memo(observer(App));
