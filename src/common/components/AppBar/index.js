import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ExpandedAppSearch from './ExpandedAppSearch';
import CollapsedAppSearch from './CollapsedAppSearch';

const styles = {
  root: {
    display: 'flex',
    width: '100%',
  },
  expandedAppSearch: {
    flex: '1 1 auto',
  },
  collapsedAppSearch: {
    flex: '1 1 auto',
  },
  '@media (max-width: 670px)': {
    expandedAppSearch: {
      visibility: 'hidden',
      display: 'none',
    },
  },
  '@media (min-width: 671px)': {
    collapsedAppSearch: {
      visibility: 'hidden',
      display: 'none',
    },
  },
};

const _AppBar = ({ classes }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            Radioactive Bird
          </Typography>
          <ExpandedAppSearch
            className={classes.expandedAppSearch}
            onSearch={text => console.log(`Searched: ${text}`)}
          />
          <CollapsedAppSearch
            className={classes.collapsedAppSearch}
            onSearch={text => console.log(`Collapsed Searched: ${text}`)}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

_AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(_AppBar);
