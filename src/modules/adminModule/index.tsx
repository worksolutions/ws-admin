import React, { useEffect } from "react";
import { AppBar, CircularProgress } from "@material-ui/core";
import systemState from "state/system/state";
import { Route, Switch } from "react-router";
import AdminPage from "./components/AdminPage";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import DrawerMenu from "./components/DrawerMenu";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

export function AdminRootComponent() {
  const { appConfig, getAdminConfig } = systemState.getState();

  useEffect(() => {
    getAdminConfig();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <DrawerMenu
        header={(openMenu) => (
          <>
            <AppBar position="sticky">
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={openMenu}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                  {appConfig ? (
                    appConfig.title
                  ) : (
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
            {appConfig ? (
              <Switch>
                {appConfig.pages.map((page) => (
                  <Route
                    key={page.pageUrl}
                    exact
                    path={page.pageUrl}
                    render={() => <AdminPage settings={page} />}
                  />
                ))}
              </Switch>
            ) : (
              <CircularProgress />
            )}
          </>
        )}
      />
    </>
  );
}
