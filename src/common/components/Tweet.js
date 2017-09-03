import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import Link from 'material-ui-icons/Link';

const styles = theme => ({
  card: {
    maxWidth: 760,
  },
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  actionButton: {
    'pointer-events': 'none',
  },
});

class Tweet extends React.Component {
  getCardHeaderTitle() {
    const { name, screen_name } = this.props.tweet.user;
    return `${name} @${screen_name}`;
  }

  getCardHeaderSubHeader() {
    const { created_at } = this.props.tweet;
    const date = new Date(created_at);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getCardHeaderAvatar() {
    const { classes, tweet: { user: { name, profile_image_url, screen_name } } } = this.props;
    if (profile_image_url) {
      const url = profile_image_url.replace(/^https?:/, '');
      return (
        <Avatar alt={name} src={url} />
      );
    }

    return (
      <Avatar alt={name} className={classes.avatar}>
        { screen_name[0] }
      </Avatar>
    );
  }

  getCardMediaPhoto(media, i) {
    const { classes, tweet: { text } } = this.props;
    const url = media.media_url.replace(/^https?:/, '');
    return (
        <CardMedia
          key={i}
          className={classes.media}
          image={url}
          title={text}
        />
    );
  }

  getCardMedia() {
    const { media } = this.props.tweet.entities || {};
    if (! media)
      return null;

    return media.map((m, i) => {
      switch (m.type) {
        case 'photo':
          return this.getCardMediaPhoto(m, i);

        default:
          console.log(`Unknown media type: ${m.type}`);
          return null;
      }

    });
  }

  render() {
    const { classes, className, tweet: { favorite_count, retweet_count, text } } = this.props;

    return (
      <Card className={[classes.card, className ? className : ''].join(' ')}>
        <CardHeader
          avatar={this.getCardHeaderAvatar()}
          title={this.getCardHeaderTitle()}
          subheader={this.getCardHeaderSubHeader()}
        />
        { this.getCardMedia() }
        <CardContent>
          <Typography component="p">
            { text }
          </Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <IconButton className={classes.actionButton}>
            <FavoriteIcon />
            <Typography type="caption">
              { favorite_count }
            </Typography>
          </IconButton>
          <IconButton className={classes.actionButton}>
            <ShareIcon />
            <Typography type="caption">
              { retweet_count }
            </Typography>
          </IconButton>
          <div className={classes.flexGrow} />
          <IconButton aria-label="Go to Tweet">
            <Link />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

Tweet.propTypes = {
  tweet: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      screen_name: PropTypes.string.isRequired,
      profile_image_url: PropTypes.string,
    }),
    favorite_count: PropTypes.number.isRequired,
    retweet_count: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    entities: PropTypes.shape({
      media: PropTypes.array,
    }),
  }),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(Tweet);
