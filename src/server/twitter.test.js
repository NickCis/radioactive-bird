jest.mock('isomorphic-fetch');
import fetch from 'isomorphic-fetch';
import Twitter, { toBase64, buildUrl, buildUrlWithQuery } from './twitter';

describe('Twitter helper functions', () => {
  it('toBase64 :: should create valid base64 string', () => {
    expect(toBase64('test')).toBe('dGVzdA==');
  });

  it('buildUrl :: should create valid url', () => {
    expect(buildUrl('a', 'b', 'c')).toBe('https://api.twitter.com/a/b/c');
  });

  it('buildUrlWithQuery :: should create valid url with query', () => {
    expect(buildUrlWithQuery({ a: 'a' }, 'a', 'b', 'c')).toBe(
      'https://api.twitter.com/a/b/c?a=a'
    );
  });
});

describe('Twitter', () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  it('_buildBasicAuth :: should create valid Basic Auth', () => {
    const twitter = new Twitter({
      consumerKey: 'test',
      consumerSecret: 'test',
    });
    expect(twitter._buildBasicAuth()).toBe('Basic dGVzdDp0ZXN0');
  });

  it('auth :: should call twitter endpoint', () => {
    const json = {
      access_token: 'test',
    };

    const twitter = new Twitter({
      consumerKey: 'test',
      consumerSecret: 'test',
    });
    fetch.mockImplementation((url, options) => {
      expect(url).toBe('https://api.twitter.com/oauth2/token');
      expect(options).toMatchObject({
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
          Authorization: expect.any(String),
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      });

      return Promise.resolve({
        status: 200,
        json: jest.fn().mockReturnValue(json),
      });
    });

    return expect(twitter.auth()).resolves.toMatchObject({
      bearerToken: json['access_token'],
    });
  });

  it('auth :: should not double auth while perfoming', () => {
    const twitter = new Twitter({
      consumerKey: 'test',
      consumerSecret: 'test',
    });
    const promise = new Promise(jest.fn());
    twitter.authPromise = promise;
    expect(twitter.auth()).toBe(promise);
    expect(fetch.mock.calls.length).toBe(0);
  });

  it('_authorizedFetch :: should make calls with bearer token', () => {
    const url = 'test';
    const json = {};
    const twitter = new Twitter({ bearerToken: 'test' });
    fetch.mockImplementation((u, opts) => {
      expect(u).toBe(url);
      expect(opts).toMatchObject({
        headers: expect.objectContaining({
          Authorization: 'Bearer test',
        }),
      });

      return Promise.resolve({
        status: 200,
        json: jest.fn().mockReturnValue(json),
      });
    });
    return expect(twitter._authorizedFetch(url)).resolves.toBe(json);
  });

  it('_authorizedFetch :: should fail when there is no bearer token', () => {
    const twitter = new Twitter({
      consumerKey: 'test',
      consumerSecret: 'test',
    });
    return expect(twitter._authorizedFetch()).rejects.toMatchObject({
      errors: expect.any(Array),
    });
  });

  it('_authorizedFetch :: should fail when response status != 200', () => {
    const url = 'test';
    const json = {};
    const twitter = new Twitter({ bearerToken: 'test' });
    fetch.mockImplementation((u, opts) => {
      return Promise.resolve({
        status: 500,
        json: jest.fn().mockReturnValue(Promise.resolve(json)),
      });
    });
    return expect(twitter._authorizedFetch(url)).rejects.toBe(json);
  });

  it('search :: should make correct call', () => {
    const query = 'test';
    const json = { query };
    const twitter = new Twitter({ bearerToken: 'test' });

    fetch.mockImplementation(u => {
      expect(u).toBe(
        `https://api.twitter.com/1.1/search/tweets.json?q=${query}`
      );
      return Promise.resolve({
        status: 200,
        json: jest.fn().mockReturnValue(json),
      });
    });

    return expect(twitter.search(query)).resolves.toBe(json);
  });

  it('getTweet :: should make correct call', () => {
    const id = 'test';
    const json = { id };
    const twitter = new Twitter({ bearerToken: 'test' });

    fetch.mockImplementation(u => {
      expect(u).toBe(`https://api.twitter.com/1.1/statuses/show.json?id=${id}`);
      return Promise.resolve({
        status: 200,
        json: jest.fn().mockReturnValue(json),
      });
    });

    return expect(twitter.getTweet(id)).resolves.toBe(json);
  });
});
