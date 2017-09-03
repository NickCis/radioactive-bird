import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import connectWithSSR from '../components/connectWithSSR';
import { searchTweets } from '../actions/tweets';
import { CircularProgress } from 'material-ui/Progress';
import { withRouter } from 'react-router-dom';
import Tweet from '../components/Tweet';

const styles = {
  tweet: {
    margin: '0 auto',
  },
  loading: {
    width: '100%',
    'text-align': 'center',
  },
};

class TweetList extends React.Component {
  static get propTypes() {
    return {
      searchTweets: PropTypes.func.isRequired,
      loading: PropTypes.bool.isRequired,
      tweets: PropTypes.array.isRequired,
      classes: PropTypes.object.isRequired,
    };
  }

  static getInitialData({ match, searchTweets }) {
    if (!match || !match.params || !match.params.query)
      return Promise.resolve();

    return searchTweets(match.params.query);
  }

  loading() {
    const { classes } = this.props;
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    )
  }

  render() {
    const { loading, tweets, classes } = this.props;
    if (loading) return this.loading();

    return (
      <div>
        {tweets.map(t => (
          <Tweet key={t.id} className={classes.tweet} tweet={t} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.search.loading,
  tweets: state.search.result.map(id => state.tweets[id]),
});

const mapDispatchToProps = dispatch => ({
  searchTweets: q => dispatch(searchTweets(q)),
});

export const StyledTweetList = withStyles(styles)(TweetList);
export default withRouter(
  connectWithSSR(mapStateToProps, mapDispatchToProps)(StyledTweetList)
);
