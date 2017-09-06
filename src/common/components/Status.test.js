import React from 'react';
import Status from './Status';
import { StaticRouter as Router } from 'react-router';
import { mount } from 'enzyme';

describe('<Status />', () => {
  it('should set the status of the static context', () => {
    const context = {};
    const code = 404;

    mount(
      <Router context={context}>
        <Status code={code} />
      </Router>
    );

    expect(context.status).toBe(code);
  });

  it('should render childs', () => {
    const context = {};
    const code = 404;

    const wrapper = mount(
      <Router context={context}>
        <Status code={code}>
          <div>This is a test</div>
        </Status>
      </Router>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
