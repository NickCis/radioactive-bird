import {
  searchTweets as searchTweetsProtocol,
  fetchTweet as fetchTweetProtocol,
} from '~/{target}/protocol';

export const SEARCH_TWEETS = 'SEARCH_TWEETS';
export const FINISHED_SEARCHING_TWEETS = 'FINISHED_SEARCHING_TWEETS';
export const ERROR_SEARCHING_TWEETS = 'ERROR_SEARCHING_TWEETS';
export const FETCH_TWEET = 'FETCH_TWEET';
export const FINISHED_FETCHING_TWEET = 'FINISHED_FETCHING_TWEET';
export const ERROR_FETCHING_TWEET = 'ERROR_FETCHING_TWEET';

export const searchTweets = query => {
  return (dispatch, getState) => {
    dispatch({
      type: SEARCH_TWEETS,
      query,
    });

    return searchTweetsProtocol(query)
      .then(payload => {
        dispatch({
          type: FINISHED_SEARCHING_TWEETS,
          payload,
          query,
        });
      })
      .catch(error => {
        dispatch({
          type: ERROR_SEARCHING_TWEETS,
          error,
          query,
        });
      });
  };
};

export const fetchTweet = id => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_TWEET,
      id,
    });

    return fetchTweetProtocol(id)
      .then(payload => {
        dispatch({
          type: FINISHED_FETCHING_TWEET,
          payload,
          id,
        });
      })
      .catch(error => {
        dispatch({
          type: ERROR_FETCHING_TWEET,
          error,
          id,
        });
      });
  };
};

export const fetchTweetIfNeeded = id => {
  return (dispatch, getState) => {
    if (getState().tweets[id]) return Promise.resolve();

    return dispatch(fetchTweet(id));
  };
};
