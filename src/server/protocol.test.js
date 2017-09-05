jest.mock('./api');
import { client as clientMock } from './api';
import { searchTweets, fetchTweet } from './protocol';

describe('Server Protocol - searchTweets', () => {
  beforeEach(() => {
    clientMock.bearerToken = undefined;
    clientMock.auth = jest.fn();
    clientMock.search = jest.fn();
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
    return expect(searchTweets(query)).resolves.toBe(json);
  });

  it('should return errors', () => {
    const query = 'test';
    const json = { query };
    clientMock.bearerToken = 'test';
    clientMock.search.mockImplementation(q => {
      expect(q).toBe(query);
      return Promise.reject(json);
    });
    return expect(searchTweets(query)).rejects.toBe(json);
  });

  // Bug: https://github.com/ReactTraining/react-router/issues/5296
  it('should decode query because react-router#5296 bug', () => {
    clientMock.bearerToken = 'test';
    return searchTweets('test%20test').then(() => {
      expect(clientMock.search.mock.calls.length).toBe(1);
      expect(clientMock.search.mock.calls[0][0]).toBe('test test');
    });
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
    return expect(fetchTweet(id)).resolves.toBe(json);
  });

  it('should return errors', () => {
    const id = 'test';
    const json = { id };
    clientMock.bearerToken = 'test';
    clientMock.getTweet.mockImplementation(q => {
      expect(q).toBe(id);
      return Promise.reject(json);
    });
    return expect(fetchTweet(id)).rejects.toBe(json);
  });
});
