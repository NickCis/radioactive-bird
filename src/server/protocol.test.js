jest.mock('./api');

import { client as clientMock } from './api';

const { searchTweets, fetchTweet } = require('./protocol');

describe('Server Protocol - searchTweets', () => {
  beforeEach(() => {
    clientMock.bearerToken = undefined;
    clientMock.auth.mockReset();
    clientMock.search.mockReset();
  });

  it('should call auth if there isn a bearer token', () => {
    clientMock.auth.mockReturnValue(new Promise(jest.fn()));
    searchTweets('test');
    expect(clientMock.auth.mock.calls.length).toBe(1);
  });

  it('should not call auth if there is a bearer token', () => {
    clientMock.bearerToken = 'test';
    searchTweets('test');
    expect(clientMock.auth.mock.calls.length).toBe(0);
  });

  it('should give a valid response', () => {
    const query = 'test';
    const json = { query };
    clientMock.bearerToken = 'test';
    clientMock.search.mockImplementation(q => {
      expect(q).toBe(query);
      return Promise.resolve(json);
    });
    expect(searchTweets(query)).resolves.toBe(json);
  });

  it('should return errors', () => {
    const query = 'test';
    const json = { query };
    clientMock.bearerToken = 'test';
    clientMock.search.mockImplementation(q => {
      expect(q).toBe(query);
      return Promise.reject(json);
    });
    expect(searchTweets(query)).rejects.toBe(json);
  });
});

describe('Server Protocol - fetchTweet', () => {
  beforeEach(() => {
    clientMock.bearerToken = undefined;
    clientMock.auth.mockReset();
    clientMock.getTweet.mockReset();
  });

  it('should call auth if there isn a bearer token', () => {
    clientMock.auth.mockReturnValue(new Promise(jest.fn()));
    fetchTweet('test');
    expect(clientMock.auth.mock.calls.length).toBe(1);
  });

  it('should not call auth if there is a bearer token', () => {
    clientMock.bearerToken = 'test';
    fetchTweet('test');
    expect(clientMock.auth.mock.calls.length).toBe(0);
  });

  it('should give a valid response', () => {
    const id = 'test';
    const json = { id };
    clientMock.bearerToken = 'test';
    clientMock.getTweet.mockImplementation(q => {
      expect(q).toBe(id);
      return Promise.resolve(json);
    });
    expect(fetchTweet(id)).resolves.toBe(json);
  });

  it('should return errors', () => {
    const id = 'test';
    const json = { id };
    clientMock.bearerToken = 'test';
    clientMock.getTweet.mockImplementation(q => {
      expect(q).toBe(id);
      return Promise.reject(json);
    });
    expect(fetchTweet(id)).rejects.toBe(json);
  });
});
