import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import AppSearch from './AppSearch';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'stretch',
    width: '100%',
  },
  grow: {
    flex: '1 1 auto',
  },
};

const _AppBar = props => {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            Radioactive Bird
          </Typography>
          <div className={classes.grow} />
          <AppSearch />
        </Toolbar>
      </AppBar>
    </div>
  );
}

_AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(_AppBar);
