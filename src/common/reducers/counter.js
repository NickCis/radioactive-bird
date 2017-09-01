import { SET_COUNTER, INCREMENT_COUNTER, DECREMENT_COUNTER, FETCH_COUNTER } from '../actions/counter';

const counter = (state = {loading: false, number: 0,}, action) => {
  switch (action.type) {
    case SET_COUNTER:
      return {
        ...state,
        loading: false,
        number: action.payload,
      };
    case INCREMENT_COUNTER:
      return {
        ...state,
        loading: false,
        number: state.number + 1,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        loading: false,
        number: state.number - 1,
      };
    case FETCH_COUNTER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default counter;
