import {
  LOADED_INITIAL_DATA,
  DISMISS_INITIAL_DATA,
} from '../actions/initialData';

const initialData = (state = { pages: [] }, action) => {
  switch (action.type) {
    case LOADED_INITIAL_DATA:
      return {
        ...state,
        pages: state.pages.concat(action.path),
      };
    case DISMISS_INITIAL_DATA:
      return {
        ...state,
        pages: state.pages.filter(p => p !== action.path),
      };
    default:
      return state;
  }
};

export default initialData;
