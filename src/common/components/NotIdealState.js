import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  wrapper: {
    'text-align': 'center',
    'margin-top': '15px',
  },
  icon: {
    width: '60px',
    height: '60px',
    color: theme.palette.grey[500],
  },
  headline: {
    color: theme.typography.headline.color,
  },
  subheading: {
    color: theme.typography.caption.color,
  },
});

export const NotIdealState = ({classes, headline, subheading, Icon}) => (
  <div className={classes.wrapper}>
    <Icon className={classes.icon} />
    <Typography type="display1" className={classes.headline}>
      { headline }
    </Typography>
    <Typography type="subheading" className={classes.subheading}>
      { subheading }
    </Typography>
  </div>
);

NotIdealState.propTypes = {
  classes: PropTypes.object.isRequired,
  headline: PropTypes.node.isRequired,
  subheading: PropTypes.node.isRequired,
  Icon: PropTypes.func.isRequired,
};

export default withStyles(styles)(NotIdealState);
