import { searchTweets, fetchTweet } from './protocol';

it('should call /api/search/${query}', () => {
  const query = 'test';
  const data = {};
  global.fetch = jest.fn().mockImplementation(url => {
    expect(url).toEqual(`/api/search/${query}`);
    return Promise.resolve({json: () => data});
  });

  expect(searchTweets(query)).resolves.toBe(data);
});

it('should call /api/tweet/${query}', () => {
  const id = 'test';
  const data = {};
  global.fetch = jest.fn().mockImplementation(url => {
    expect(url).toEqual(`/api/tweet/${id}`);
    return Promise.resolve({json: () => data});
  });

  expect(fetchTweet(id)).resolves.toBe(data);
});
