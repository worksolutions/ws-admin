import React from "react";
import { AppBar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import { HideOnScroll } from "primitives/HideOnScroll";
import adminModule from "modules/adminModule";

function App() {
  return (
    <div>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">Административная панель.</Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Container>{adminModule.run()}</Container>
    </div>
  );
}

export default App;
