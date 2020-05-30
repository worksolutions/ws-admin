import React, { useEffect } from "react";

import { createAdminComponent } from "./modules/adminModule/componentBuilder";
import DrawerMenu from "./modules/adminModule/components/DrawerMenu";
import systemState from "./state/system/state";
import { AppBar, CircularProgress } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { Route, Switch } from "react-router";
import AdminPage from "./modules/adminModule/components/AdminPage";
import { StoreContext } from "light-state-manager";
import pageState from "./state/page/state";

export default React.memo(function () {
  const { appConfig, getAdminConfig } = systemState.getState();
  const WrappedDrawerMenu = createAdminComponent(DrawerMenu, {});
  const Page = StoreContext.connectContexts([[pageState, "page"]], AdminPage);

  useEffect(() => {
    getAdminConfig();
    // eslint-disable-next-line
  }, []);

  if (!appConfig) {
    return <CircularProgress />;
  }

  return (
    <WrappedDrawerMenu
      dataSource={appConfig.sideMenu.dataSource}
      content={(openMenu) => (
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
                  render={(props) => <Page {...props} settings={page} />}
                />
              ))}
            </Switch>
          ) : (
            <CircularProgress />
          )}
        </>
      )}
    />
  );
});
