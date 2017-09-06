import React from 'react';
import Title from './Title';
import { StaticRouter, MemoryRouter } from 'react-router';
import { mount } from 'enzyme';

describe('<Titile />', () => {
  it('should set the title of the static context', () => {
    const context = {};
    const title = 'test title';

    mount(
      <StaticRouter location="/" context={context}>
        <Title title={title} />
      </StaticRouter>
    );

    expect(context.title).toBe(title);
  });

  it('should set the title of document', () => {
    const title = 'test title';

    mount(
      <MemoryRouter>
        <Title title={title} />
      </MemoryRouter>
    );

    expect(document.title).toBe(title);
  });

  it('should render childs', () => {
    const context = {};
    const title = 'test title';

    const wrapper = mount(
      <StaticRouter location="/" context={context}>
        <Title title={title}>
          <div>This is a test</div>
        </Title>
      </StaticRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
