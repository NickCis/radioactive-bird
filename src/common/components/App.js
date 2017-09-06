import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '../components/AppBar';
import { renderRoutes } from 'react-router-config';
import { withStyles } from 'material-ui/styles';
import Title from './Title';

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
  <Title title="Radioactive Bird">
    <div>
      <AppBar />
      {renderRoutes(route.routes)}
    </div>
  </Title>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
