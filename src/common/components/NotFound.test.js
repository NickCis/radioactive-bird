import React from 'react';
import { createRender } from 'material-ui/test-utils';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  const render = createRender();

  it('renders correctly', () => {
    const wrapper = render(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
