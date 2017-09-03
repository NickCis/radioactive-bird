import React from 'react';
import { createRender } from 'material-ui/test-utils';
import Tweet from './Tweet';

describe('<Tweet />', () => {
  const render = createRender();

  it('renders Tweet correctly', () => {
    const wrapper = render(
      <Tweet
        tweet={{
          title: 'test',
          user: {
            screen_name: 'test',
            name: 'Test',
          },
          favorite_count: 0,
          retweet_count: 0,
          text: 'test',
          created_at: 'Sun Sep 03 20:05:30 +0000 2017',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
