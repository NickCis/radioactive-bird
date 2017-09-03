import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import connectWithSSR from '../components/connectWithSSR';
import { searchTweets } from '../actions/tweets';
import { CircularProgress } from 'material-ui/Progress';
import { withRouter } from 'react-router-dom';

const styles = {};

class TweetList extends React.Component {
  static get propTypes() {
    return {
      searchTweets: PropTypes.func.isRequired,
      loading: PropTypes.bool.isRequired,
      tweets: PropTypes.array.isRequired,
    };
  }

  static getInitialData({ match, searchTweets }) {
    if (!match || !match.params || !match.params.query)
      return Promise.resolve();

    return searchTweets(match.params.query);
  }

  loading() {
    return <CircularProgress />;
  }

  render() {
    const { loading, tweets } = this.props;
    if (loading) return this.loading();

    return (
      <div>
        <ul>
          {tweets.map(t => (
            <li key={t.id}>
              {t.user.name}: {t.text}
            </li>
          ))}
        </ul>
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
