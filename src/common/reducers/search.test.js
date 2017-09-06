import reducer from './search';
import {
  SEARCH_TWEETS,
  FINISHED_SEARCHING_TWEETS,
  ERROR_SEARCHING_TWEETS,
} from '../actions/tweets';

describe('search - reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      result: [],
      metadata: {},
      query: '',
    });
  });

  it('should handle SEARCH_TWEETS', () => {
    expect(
      reducer(undefined, {
        type: SEARCH_TWEETS,
        query: 'test',
      })
    ).toEqual({
      error: undefined,
      isError: false,
      loading: true,
      metadata: {},
      result: [],
      query: 'test',
    });
  });

  it('should handle FINISHED_SEARCHING_TWEETS', () => {
    const tweet = { id_str: 'test' };
    expect(
      reducer(undefined, {
        type: FINISHED_SEARCHING_TWEETS,
        payload: {
          statuses: [tweet],
          search_metadata: {},
        },
      })
    ).toEqual({
      loading: false,
      metadata: {},
      result: [tweet['id_str']],
      query: '',
    });
  });

  it('should handle ERROR_SEARCHING_TWEETS', () => {
    expect(
      reducer(undefined, {
        type: ERROR_SEARCHING_TWEETS,
        error: {},
      })
    ).toEqual({
      loading: false,
      metadata: {},
      result: [],
      isError: true,
      error: {},
      query: '',
    });
  });
});
