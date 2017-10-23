import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '~/common/store/configureStore';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from '~/common/styles/theme';
import SheetsManager from '~/common/styles/SheetsManager';
import { renderRoutes } from 'react-router-config';
import routes from '~/common/routes';

const store = configureStore(window.__PRELOADED_STATE__);
const sheetsManager = new SheetsManager();

hydrate(
  <Provider store={store}>
    <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
  () => {
    // [ReHydratation](https://github.com/cssinjs/jss/blob/master/docs/ssr.md)
    const jssStyles = document.getElementById('jss-ssr');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
);

if (module.hot) {
  module.hot.accept();
}
