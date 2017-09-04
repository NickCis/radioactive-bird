import { combineReducers } from 'redux';
import initialData from './initialData';
import tweets from './tweets';
import search from './search';

const rootReducer = combineReducers({
  // XXX: in order to get req in SSR
  req: s => s || false,
  initialData,
  tweets,
  search,
});

export default rootReducer;
