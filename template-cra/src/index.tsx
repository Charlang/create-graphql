import React from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import theme from './components/theme';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ThemeProvider theme={theme()}>
    <Global
      styles={css`
        body {
          background-color: #f0f2f5;
        }
      `}
    />
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
