import React from 'react';
import { createRender } from 'material-ui/test-utils';
import { StyledTweetList as TweetList } from './TweetList';
import { StaticRouter } from 'react-router';

describe('<TweetList />', () => {
  const render = createRender();

  it('renders TweetList correctly - loading', () => {
    const wrapper = render(
      <StaticRouter location="/" context={{}}>
        <TweetList loading={true} searchTweets={jest.fn()} tweets={[]} />
      </StaticRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders TweetList correctly - empty list', () => {
    const wrapper = render(
      <StaticRouter location="/" context={{}}>
        <TweetList loading={false} searchTweets={jest.fn()} tweets={[]} />
      </StaticRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders TweetList correctly - with tweets', () => {
    const wrapper = render(
      <StaticRouter location="/" context={{}}>
        <TweetList
          loading={false}
          searchTweets={jest.fn()}
          tweets={[
            {
              id: 'test',
              title: 'test',
              user: {
                screen_name: 'test',
                name: 'Test',
              },
              favorite_count: 0,
              retweet_count: 0,
              text: 'test',
              created_at: 'Sun Sep 03 20:05:30 +0000 2017',
            },
          ]}
        />
      </StaticRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
