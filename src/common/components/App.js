import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '../components/AppBar';
import Counter from '../containers/Counter';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
    },
  },
});

const App = ({classes}) => (
  <div>
    <AppBar />
    <Counter />
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
