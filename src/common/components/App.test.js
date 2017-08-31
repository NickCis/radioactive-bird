import React from 'react';
import { Provider } from 'react-redux';
import { createRender } from 'material-ui/test-utils';
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
    const wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
