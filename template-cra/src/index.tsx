import React from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';
import App from './App';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <div>
    <Global
      styles={css`
        body {
          background-color: #f0f2f5;
        }
      `}
    />
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <App />
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

