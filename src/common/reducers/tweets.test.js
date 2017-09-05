import reducer from './tweets';
import {
  FINISHED_SEARCHING_TWEETS,
  FETCH_TWEET,
  FINISHED_FETCHING_TWEET,
  ERROR_FETCHING_TWEET,
} from '../actions/tweets';

describe('tweets - reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle FINISHED_SEARCHING_TWEETS', () => {
    const tweet = { id_str: 'test' };
    expect(
      reducer(undefined, {
        type: FINISHED_SEARCHING_TWEETS,
        payload: {
          statuses: [tweet],
        },
      })
    ).toEqual({ [tweet['id_str']]: tweet });
  });

  it('should handle FETCH_TWEET', () => {
    expect(
      reducer(undefined, {
        type: FETCH_TWEET,
        id: 'test',
      })
    ).toEqual({ test: { loading: true } });
  });

  it('should handle FINISHED_FETCHING_TWEET', () => {
    const tweet = { id_str: 'test' };
    expect(
      reducer(undefined, {
        type: FINISHED_FETCHING_TWEET,
        payload: tweet,
        id: tweet['id_str'],
      })
    ).toEqual({ [tweet['id_str']]: tweet });
  });
  it('should handle ERROR_FETCHING_TWEET', () => {
    expect(
      reducer(undefined, {
        type: ERROR_FETCHING_TWEET,
        error: {},
        id: 'test',
      })
    ).toEqual({ test: { isError: true, error: {} } });
  });
});
