import * as singleSpa from 'single-spa';

declare global {
  interface Window {
    System: {
      import: Function;
    };
  }
}

fetch('/app/%SINGLE_SPA_APP%/manifest')
  .then((response) => response.json())
  .then((app) => {
    const combineEnv = { ...(app && app.env) };
    singleSpa.registerApplication('%SINGLE_SPA_APP%', () => window.System.import(app.js[0]), () => true, {
      app,
      microApp: true,
      environmentVariables: combineEnv,
    });
  });

singleSpa.start();
