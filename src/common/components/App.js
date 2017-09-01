import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '../components/AppBar';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';

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

const App = ({ classes, route }) => (
  <div>
    <AppBar />
    <Link to='/'>Home</Link>
    <Link to='/asdasd'>Not Found</Link>
    {renderRoutes(route.routes)}
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
