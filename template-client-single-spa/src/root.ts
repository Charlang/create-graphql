import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { property } from 'lodash';
import rootComponent from './root.component';

export const setPublicPath = (path: any) => {
  return Promise.all([path]).then((values) => {
    const [url] = values;
    // eslint-disable-next-line camelcase
    __webpack_public_path__ = url;
    return true;
  });
};

function domElementGetter() {
  let el = document.getElementById('_SINGLE_SPA_APP_');
  if (!el) {
    el = document.createElement('div');
    el.id = '_SINGLE_SPA_APP_';
    document.body.appendChild(el);
  }
  return el;
}

const reactLifeCycles = singleSpaReact({
  // @ts-ignore
  React,
  // @ts-ignore
  ReactDOM,
  rootComponent,
  domElementGetter
});

export const bootstrap: any = [
  (props: any) => {
    const { app } = props;
    return setPublicPath(app.publicPath);
  },
  reactLifeCycles.bootstrap
];

export const mount = [reactLifeCycles.mount];

export const unmount = [reactLifeCycles.unmount];

export const unload = [
  // @ts-ignore
  reactLifeCycles.unload
];
