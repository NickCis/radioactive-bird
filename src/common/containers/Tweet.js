import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import TweetComponent from '../components/Tweet';
import connectWithSSR from '../components/connectWithSSR';
import { bindActionCreators } from 'redux';
import { fetchTweetIfNeeded, fetchTweet } from '../actions/tweets';

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
  static getInitialData({fetchTweetIfNeeded, match}) {
    if (!match || !match.params || !match.params.id)
      return Promise.resolve();

    return fetchTweetIfNeeded(match.params.id);
  }

  static get propTypes() {
    return {
      match: PropTypes.object.isRequired,
      tweets: PropTypes.object.isRequired,
      fetchTweetIfNeeded: PropTypes.func.isRequired,
    };
  }

  isLoading() {
    const tweet = this.getTweet();
    if (! tweet)
      return true;

    return tweet.loading;
  }

  getId() {
    return this.props.match.params.id;
  }

  getTweet() {
    return this.props.tweets[this.getId()];
  }

  loading() {
    const { classes } = this.props;
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    if (this.isLoading())
      return this.renderLoading();

    return (
      <div className={classes.wrapper}>
        <TweetComponent className={classes.tweet} tweet={this.getTweet()} hideLink={true}/>
      </div>
    );
  }
}

export const StyledTweet = withStyles(styles)(Tweet);

const mapStateToProps = state => ({
  tweets: state.tweets,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTweetIfNeeded,
  fetchTweet,
}, dispatch);

export default connectWithSSR(mapStateToProps, mapDispatchToProps)(StyledTweet);
