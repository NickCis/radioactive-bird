import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import TweetComponent from '../components/Tweet';
import connectWithSSR from '../components/connectWithSSR';
import { bindActionCreators } from 'redux';
import { fetchTweetIfNeeded, fetchTweet } from '../actions/tweets';
import NotIdealState from '../components/NotIdealState';
import BugReport from 'material-ui-icons/BugReport';

const styles = {
  wrapper: {
    margin: '15px',
  },
  tweet: {
    margin: '0 auto',
  },
  loading: {
    'margin-top': '15px',
    width: '100%',
    'text-align': 'center',
  },
};

export class Tweet extends React.Component {
  static getInitialData({ fetchTweetIfNeeded, match }) {
    if (!match || !match.params || !match.params.id) return Promise.resolve();

    return fetchTweetIfNeeded(match.params.id);
  }

  static get propTypes() {
    return {
      match: PropTypes.object.isRequired,
      tweets: PropTypes.object.isRequired,
      fetchTweetIfNeeded: PropTypes.func.isRequired,
      classes: PropTypes.object.isRequired,
    };
  }

  isLoading() {
    const tweet = this.getTweet();
    if (!tweet) return true;

    return tweet.loading;
  }

  getId() {
    return this.props.match.params.id;
  }

  getTweet() {
    return this.props.tweets[this.getId()];
  }

  renderLoading() {
    const { classes } = this.props;
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  isError() {
    const tweet = this.getTweet();
    if (!tweet) return false;
    return tweet.isError;
  }

  getError() {
    const tweet = this.getTweet();
    if (!tweet) return undefined;
    return tweet.error;
  }

  renderError() {
    const error = this.getError();
    let errorText = 'An error was encountered while performing the search';

    if (error && error.errors && error.errors[0] && error.errors[0].message)
      errorText = error.errors[0].message;

    return (
      <NotIdealState headline="Error" subheading={errorText} Icon={BugReport} />
    );
  }

  render() {
    const { classes } = this.props;
    if (this.isLoading()) return this.renderLoading();
    if (this.isError()) return this.renderError();

    return (
      <div className={classes.wrapper}>
        <TweetComponent
          className={classes.tweet}
          tweet={this.getTweet()}
          hideLink={true}
        />
      </div>
    );
  }
}

export const StyledTweet = withStyles(styles)(Tweet);

const mapStateToProps = state => ({
  tweets: state.tweets,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTweetIfNeeded,
      fetchTweet,
    },
    dispatch
  );

export default connectWithSSR(mapStateToProps, mapDispatchToProps)(StyledTweet);
