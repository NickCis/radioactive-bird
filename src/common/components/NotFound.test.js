import React from 'react';
import { createRender } from 'material-ui/test-utils';
import { MemoryRouter as Router } from 'react-router-dom';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  const render = createRender();

  it('renders correctly', () => {
    const wrapper = render(
      <Router>
        <NotFound />
      </Router>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
