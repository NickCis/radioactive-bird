import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MaterialAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ExpandedAppSearch from './ExpandedAppSearch';
import CollapsedAppSearch from './CollapsedAppSearch';
import { Link, withRouter } from 'react-router-dom';

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
  link: {
    'text-decoration': 'none',
    color: 'inherit',
  },
};

const AppBar = ({ classes, history, query }) => {
  const search = t => history.push(`/search/${encodeURIComponent(t)}`);
  return (
    <div className={classes.root}>
      <MaterialAppBar position="static">
        <Toolbar>
          <Link className={classes.link} to="/">
            <Typography type="title" color="inherit">
              Radioactive Bird
            </Typography>
          </Link>
          <ExpandedAppSearch
            className={classes.expandedAppSearch}
            onSearch={search}
            text={query || ''}
          />
          <CollapsedAppSearch
            className={classes.collapsedAppSearch}
            onSearch={search}
            text={query || ''}
          />
        </Toolbar>
      </MaterialAppBar>
    </div>
  );
};

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  query: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default withStyles(styles)(withRouter(AppBar));
