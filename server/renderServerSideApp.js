import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

// import indexHtml from './indexHtml';
import App from '../src/App';
import configureStore from '../src/utils/configureStore';
import fetchDataForRender from './fetchDataForRender';

const PUBLIC_URL = process.env.PUBLIC_URL || '';
const isProduction = process.env.NODE_ENV === 'production';
let assetManifest = {
  'node-modules.js': 'node-modules.bundle.js',
  'main.js': 'main.bundle.js'
};

if (isProduction) {
  assetManifest = require('../build/asset-manifest.json');
}

const preloadScripts = () => {
  const paths = [
    assetManifest['node-modules.js'],
    assetManifest['main.js']
  ];

  return paths.reduce((string, path) => {
    string += `<link rel="preload" as="script" href=${PUBLIC_URL}/${path} />`;
    return string;
  }, '');
};

const cssLinks = () => {
  const paths = [
    assetManifest['main.css']
  ];

  if (isProduction) {
    return paths.reduce((string, path) => {
      string += `<link rel="stylesheet" href=${PUBLIC_URL}/${path} />`;
      return string;
    }, '');
  } else {
    return '';
  }
};

const jsScripts = () => {
  const paths = [
    assetManifest['node-modules.js'],
    assetManifest['main.js']
  ];

  return paths.reduce((string, path) => {
    string += `<script type="text/javascript" src=${PUBLIC_URL}/${path}></script>`;
    return string;
  }, '');
};

const indexHtml = ({ initialState, helmet, markup }) => {
  const htmlAttrs = helmet.htmlAttributes.toString();
  const bodyAttrs = helmet.bodyAttributes.toString();

  return `
    <!doctype html>
    <html lang="en" ${htmlAttrs}>
      <head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-117491956-1"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
  
        gtag('config', 'UA-117491956-1');
      </script>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${preloadScripts()}
        ${helmet.link.toString()}
        ${cssLinks()}
        ${helmet.style.toString()}
        ${helmet.script.toString()}
        ${helmet.noscript.toString()}
      </head>
      <body ${bodyAttrs}>
        <div id="root">${markup}</div>

        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>

        ${jsScripts()}
        <script async type="text/javascript" src="https://checkoutshopper-test.adyen.com/checkoutshopper/assets/js/sdk/checkoutSDK.1.2.1.min.js"></script>
      </body>
    </html>
  `;
};

const renderServerSideApp = (req, res, initialContext) => {
  if (typeof initialContext !== 'object') {
    initialContext = undefined;
  }
  const store = configureStore(initialContext, { logger: false });

  fetchDataForRender(req, store).then(() => {
    const context = initialContext || {};

    const markup = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      const helmet = Helmet.renderStatic();
      const fullMarkup = indexHtml({
        initialState: store.getState(),
        helmet,
        markup
      });
      res.status(200).send(fullMarkup);
    }
  });
};

export default renderServerSideApp;
