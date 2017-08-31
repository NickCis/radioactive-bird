import React from 'react';
import { createRender } from 'material-ui/test-utils';
import AppBar from './';

describe('<AppBar />', () => {
  let render;

  beforeAll(() => {
    render = createRender();
  });

  it('renders without crashing', () => {
    render(<AppBar />);
  });
});
