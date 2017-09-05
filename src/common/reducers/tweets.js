import {
  FINISHED_SEARCHING_TWEETS,
  FETCH_TWEET,
  FINISHED_FETCHING_TWEET,
  ERROR_FETCHING_TWEET,
} from '../actions/tweets';

export default (state = {}, action) => {
  switch (action.type) {
    case FINISHED_SEARCHING_TWEETS:
      return {
        ...state,
        ...action.payload.statuses.reduce((acc, ele) => {
          acc[ele['id_str']] = ele;
          return acc;
        }, {}),
      };

    case FINISHED_FETCHING_TWEET:
      return {
        ...state,
        [action.id]: action.payload,
      };

    case FETCH_TWEET:
      return {
        ...state,
        [action.id]: {
          loading: true,
        },
      };

    case ERROR_FETCHING_TWEET:
      return {
        ...state,
        [action.id]: {
          isError: true,
          error: action.error,
        },
      };

    default:
      return state;
  }
};
