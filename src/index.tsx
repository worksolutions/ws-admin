import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

ReactDOM.render(
  <React.StrictMode>
    <ScopedCssBaseline>
      <CssBaseline />
      <App />
    </ScopedCssBaseline>
  </React.StrictMode>,
  document.getElementById('root'),
);
