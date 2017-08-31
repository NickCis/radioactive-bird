import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../actions';

const Counter = ({
  increment,
  incrementIfOdd,
  incrementAsync,
  decrement,
  counter,
}) => (
  <p>
    Clicked: {counter} times <button onClick={increment}>+</button>{' '}
    <button onClick={decrement}>-</button>{' '}
    <button onClick={incrementIfOdd}>Increment if odd</button>{' '}
    <button onClick={() => incrementAsync()}>Increment async</button>
  </p>
);

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  counter: state.counter,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
