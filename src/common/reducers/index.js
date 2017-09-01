import { combineReducers } from 'redux';
import counter from './counter';
import initialData from './initialData';

const rootReducer = combineReducers({
  // XXX: in order to get req in SSR
  req: s => s || false,
  counter,
  initialData,
});

export default rootReducer;
