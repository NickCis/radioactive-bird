import React from 'react';
import Title from './Title';
import { StaticRouter as Router } from 'react-router';
import { mount } from 'enzyme';

describe('<Titile />', () => {
  it('should set the title of the static context', () => {
    const context = {};
    const title = 'test title';

    mount(
      <Router context={context}>
        <Title title={title} />
      </Router>
    );

    expect(context.title).toBe(title);
  });

  it('should set the title of document', () => {
    global.document = {};
    const title = 'test title';

    mount(
      <Router context={{}}>
        <Title title={title} />
      </Router>
    );

    expect(document.title).toBe(title);
  });

  it('should render childs', () => {
    const context = {};
    const title = 'test title';

    const wrapper = mount(
      <Router context={context}>
        <Title title={title}>
          <div>This is a test</div>
        </Title>
      </Router>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
