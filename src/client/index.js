import React from 'react';
import { JssProvider } from 'react-jss';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';

import { MuiThemeProvider } from 'material-ui/styles';
import { sheetsManager, theme, sheetsRegistry, jss } from '../common/styles';
import App from '../common/components/App';

const store = configureStore(window.__PRELOADED_STATE__);

render(
  <Provider store={store}>
    <JssProvider registry={sheetsRegistry} jss={jss}>
      <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
        <App />
      </MuiThemeProvider>
    </JssProvider>
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
