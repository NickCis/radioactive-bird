jest.mock('../twitter');
import Twitter from '../twitter';

const twitterMock = {
  auth: jest.fn(),
  bearerToken: undefined,
  getTweet: jest.fn(),
  search: jest.fn(),
};

Twitter.mockImplementation(() => {
  return twitterMock;
});

const { default: api } = require('./index');

let response;
let next;

const reset = () => {
  twitterMock.auth.mockReset();
  twitterMock.bearerToken = undefined;
  twitterMock.getTweet.mockReset();
  twitterMock.search.mockReset();

  response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis(),
  };
  next = jest.fn();
};

describe('/search/:query - endpoint', () => {
  beforeEach(() => {
    reset();
  });

  it('should call auth if there isn a bearer token', () => {
    twitterMock.auth.mockReturnValue(new Promise(jest.fn()));
    api({ method: 'GET', url: '/search/test' }, response, next);
    expect(twitterMock.auth.mock.calls.length).toBe(1);
  });

  it('should not call auth if there is a bearer token', () => {
    twitterMock.bearerToken = 'test';
    api({ method: 'GET', url: '/search/test' }, response, next);
    expect(twitterMock.auth.mock.calls.length).toBe(0);
  });

  it('should give a valid response', () => {
    return new Promise(rs => {
      const query = 'test';
      const json = { query };
      twitterMock.bearerToken = 'test';
      twitterMock.search.mockImplementation(q => {
        expect(q).toBe(query);
        return Promise.resolve(json);
      });

      response.json.mockImplementation(j => {
        expect(j).toBe(json);
        rs();
      });

      api({ method: 'GET', url: `/search/${query}` }, response, next);
    });
  });

  it('should return errors', () => {
    return new Promise(rs => {
      const query = 'test';
      const json = { query };
      twitterMock.bearerToken = 'test';
      twitterMock.search.mockImplementation(q => {
        expect(q).toBe(query);
        return Promise.reject(json);
      });

      response.json.mockImplementation(j => {
        expect(j).toBe(json);
        rs();
      });

      api({ method: 'GET', url: `/search/${query}` }, response, next);
    });
  });
});

describe('/tweet/:id - endpoint', () => {
  beforeEach(() => {
    reset();
  });

  it('should call auth if there isn a bearer token', () => {
    twitterMock.auth.mockReturnValue(new Promise(jest.fn()));
    api({ method: 'GET', url: '/tweet/test' }, response, next);
    expect(twitterMock.auth.mock.calls.length).toBe(1);
  });

  it('should not call auth if there is a bearer token', () => {
    twitterMock.bearerToken = 'test';
    api({ method: 'GET', url: '/tweet/test' }, response, next);
    expect(twitterMock.auth.mock.calls.length).toBe(0);
  });

  it('should give a valid response', () => {
    return new Promise(rs => {
      const id = 'test';
      const json = { id };
      twitterMock.bearerToken = 'test';
      twitterMock.getTweet.mockImplementation(q => {
        expect(q).toBe(id);
        return Promise.resolve(json);
      });

      response.json.mockImplementation(j => {
        expect(j).toBe(json);
        rs();
      });

      api({ method: 'GET', url: `/tweet/${id}` }, response, next);
    });
  });

  it('should return errors', () => {
    return new Promise(rs => {
      const id = 'test';
      const json = { id };
      twitterMock.bearerToken = 'test';
      twitterMock.getTweet.mockImplementation(q => {
        expect(q).toBe(id);
        return Promise.reject(json);
      });

      response.json.mockImplementation(j => {
        expect(j).toBe(json);
        rs();
      });

      api({ method: 'GET', url: `/tweet/${id}` }, response, next);
    });
  });
});
