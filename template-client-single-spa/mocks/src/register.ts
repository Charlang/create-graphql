import * as singleSpa from 'single-spa';

declare global {
  interface Window {
    System: {
      import: Function;
    };
  }
}

fetch('/app/_SINGLE_SPA_APP_/manifest')
  .then((response) => response.json())
  .then((app) => {
    const combineEnv = { ...(app && app.env) };
    singleSpa.registerApplication('_SINGLE_SPA_APP_', () => window.System.import(app.js[0]), () => true, {
      app,
      microApp: true,
      environmentVariables: combineEnv,
    });
  });

singleSpa.start();
