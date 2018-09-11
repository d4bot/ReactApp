import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import deepPurple from '@material-ui/core/colors/deeppurple';
import red from '@material-ui/core/colors/red';
import routes from './routes/routes';

const theme = createMuiTheme({
  typography: {
    fontSize: 14
  },
  palette: {
    action: {
      active: '#fff'
    },
    primary: deepPurple,
    secondary: red,
    background: {
      default: '#303030',
      paper: '#424242'
    },
    common: {
      black: '#000',
      white: '#fff'
    },
    contrastThreshold: 3,
    divider: 'rgba(255, 255, 255, 0.12)'
  },
});

console.log(theme);

render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter basename="/">
      { renderRoutes(routes) }
    </BrowserRouter>
  </MuiThemeProvider>,
  document.querySelector('#app')
);