import React from 'react';
import { createRender } from 'material-ui/test-utils';
import Home from './Home';

describe('<Home />', () => {
  const render = createRender();

  it('renders correctly', () => {
    const wrapper = render(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});
