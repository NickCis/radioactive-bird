import React from 'react';
import { Provider } from 'react-redux';
import { createRender } from 'material-ui/test-utils';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import routes from '~/common/routes';
import configureStore from '~/common/store/configureStore';
import App from './App';

describe('<App />', () => {
  let render;
  let store;

  beforeAll(() => {
    render = createRender();
    store = configureStore();
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <StaticRouter location='/' context={{}}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );
  });
});
