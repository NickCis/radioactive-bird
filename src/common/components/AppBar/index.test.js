import React from 'react';
import { createRender } from 'material-ui/test-utils';
import AppBar from './';
import { StaticRouter } from 'react-router-dom';

describe('<AppBar />', () => {
  let render;

  beforeAll(() => {
    render = createRender();
  });

  it('renders without crashing', () => {
    render(
      <StaticRouter location="" context={{}}>
        <AppBar />
      </StaticRouter>
    );
  });
});
