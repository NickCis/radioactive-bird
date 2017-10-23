import configureStore from '../common/store/configureStore';
import express from 'express';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import React from 'react';
import { Provider } from 'react-redux';
import SheetsManager from '~/common/styles/SheetsManager';
import { SheetsRegistry, JssProvider } from 'react-jss';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from '../common/styles/theme';
import jss from './jss';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router';
import routes from '~/common/routes';
import api from './api';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use('/api', api)
  .get('/*', (req, res) => {
    // Create a new Redux store instance
    const store = configureStore({ req });
    const dispatch = act => store.dispatch(act);
    const getState = () => store.getState();

    // Get routes branch in order to preload data
    const branch = matchRoutes(routes, req.url);
    const promises = branch.reduce((acc, b) => {
      const getInitialData = b.route.component.getInitialData;
      if (getInitialData)
        acc = acc.concat(
          getInitialData({ dispatch, getState, route: b.route, match: b.match })
        );
      return acc;
    }, []);

    Promise.all(promises)
      .catch(error => {
        console.error('Error found while loading data');
        console.error(error);
      })
      .then(d => {
        // React Router context
        const context = {};

        const sheetsRegistry = new SheetsRegistry();
        const sheetsManager = new SheetsManager();

        // Render the component to a string
        const markup = renderToString(
          <Provider store={store}>
            <JssProvider registry={sheetsRegistry} jss={jss}>
              <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
                <StaticRouter location={req.url} context={context}>
                  {renderRoutes(routes)}
                </StaticRouter>
              </MuiThemeProvider>
            </JssProvider>
          </Provider>
        );

        const css = sheetsRegistry.toString();

        // Grab the initial state from our Redux store
        const finalState = store.getState();

        // Delete the `req` property
        delete finalState.req;

        if (context.status) res.status(context.status);

        if (context.url) {
          res.writeHead(301, { Location: context.url }).end();
          return;
        }

        res.send(
          `<!doctype html>
          <html lang="">
          <head>
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta charSet='utf-8' />
              <title>${context.title || 'Radioactive Bird'}</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500">
              ${assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''}
              ${css ? `<style id='jss-ssr'>${css}</style>` : ''}
              ${process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client
                    .js}" defer crossorigin></script>`}
          </head>
          <body>
              <div id="root"><div>${markup}</div></div>
              <script>
                window.__PRELOADED_STATE__ = ${serialize(finalState)}
              </script>
          </body>
          </html>`
        );
      });
  });

export default server;
