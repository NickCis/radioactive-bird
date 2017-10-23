import { combineReducers } from 'redux';
import tweets from './tweets';
import search from './search';
import { REDUCER_KEY, reducer } from 'redux-data-ssr';

const rootReducer = combineReducers({
  // XXX: in order to get req in SSR
  req: s => s || false,
  tweets,
  search,
  [REDUCER_KEY]: reducer,
});

export default rootReducer;
