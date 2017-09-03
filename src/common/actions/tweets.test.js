import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './tweets';
import { __setCallingFunction } from '~/{target}/protocol';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('tweets - Actions', () => {
  it('creates FINISHED_SEARCHING_TWEETS when searching tweets has been done', () => {
    const expectedActions = [
      { type: actions.SEARCH_TWEETS, query: 'test' },
      { type: actions.FINISHED_SEARCHING_TWEETS, query: 'test', payload: {} },
    ];

    const searchTweets = jest.fn().mockReturnValue(Promise.resolve({}));

    __setCallingFunction('searchTweets', searchTweets);

    const store = mockStore({});

    return store.dispatch(actions.searchTweets('test')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    expect(actions.setLoadedInitialData(path)).toEqual(expectedAction);
  });

  it('creates ERROR_SEARCHING_TWEETS when searching tweets has been returned error', () => {
    const expectedActions = [
      { type: actions.SEARCH_TWEETS, query: 'test' },
      { type: actions.ERROR_SEARCHING_TWEETS, query: 'test', error: {} },
    ];

    const searchTweets = jest.fn().mockReturnValue(Promise.reject({}));

    __setCallingFunction('searchTweets', searchTweets);

    const store = mockStore({});

    return store.dispatch(actions.searchTweets('test')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    expect(actions.setLoadedInitialData(path)).toEqual(expectedAction);
  });

  it('creates FINISHED_FETCHING_TWEET when fetching tweet has been done', () => {
    const expectedActions = [
      { type: actions.FETCH_TWEET, id: 'test' },
      { type: actions.FINISHED_FETCHING_TWEET, id: 'test', payload: {} },
    ];

    const fetchTweet = jest.fn().mockReturnValue(Promise.resolve({}));

    __setCallingFunction('fetchTweet', fetchTweet);

    const store = mockStore({});

    return store.dispatch(actions.fetchTweet('test')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    expect(actions.setLoadedInitialData(path)).toEqual(expectedAction);
  });

  it('creates ERROR_FETCHING_TWEET when fetching tweet has been done', () => {
    const expectedActions = [
      { type: actions.FETCH_TWEET, id: 'test' },
      { type: actions.ERROR_FETCHING_TWEET, id: 'test', error: {} },
    ];

    const fetchTweet = jest.fn().mockReturnValue(Promise.reject({}));

    __setCallingFunction('fetchTweet', fetchTweet);

    const store = mockStore({});

    return store.dispatch(actions.fetchTweet('test')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    expect(actions.setLoadedInitialData(path)).toEqual(expectedAction);
  });
});
