import React from 'react';
import { AppBar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { HideOnScroll } from './primitives/HideOnScroll';

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
    </div>
  );
}

export default App;
