import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

import { bindActionCreators } from 'redux';
import connectWithSSR from '~/common/components/connectWithSSR';
import { withRouter } from 'react-router-dom';
import * as CounterActions from '~/common/actions/counter';

export class Counter extends React.Component {
  static get propTypes() {
    return {
      increment: PropTypes.func.isRequired,
      incrementIfOdd: PropTypes.func.isRequired,
      incrementAsync: PropTypes.func.isRequired,
      decrement: PropTypes.func.isRequired,
      counter: PropTypes.number.isRequired,
      loading: PropTypes.bool.isRequired,
    };
  }

  static getInitialData({ fetch }) {
    return fetch();
  }

  loading() {
    return <CircularProgress />;
  }

  render() {
    const {
      increment,
      incrementIfOdd,
      incrementAsync,
      decrement,
      counter,
      loading,
    } = this.props;

    if (loading) return this.loading();

    return (
      <p>
        Clicked: {counter} times <Button onClick={increment}>+</Button>{' '}
        <Button onClick={decrement}>-</Button>{' '}
        <Button onClick={incrementIfOdd}>Increment if odd</Button>{' '}
        <Button onClick={() => incrementAsync()}>Increment async</Button>
      </p>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.counter.number,
  loading: state.counter.loading,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default withRouter(
  connectWithSSR(mapStateToProps, mapDispatchToProps)(Counter)
);
