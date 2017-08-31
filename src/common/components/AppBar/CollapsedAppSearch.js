import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui-icons/Search';
import Clear from 'material-ui-icons/Clear';
import ArrowBack from 'material-ui-icons/ArrowBack';
import { withStyles } from 'material-ui/styles';
import { placeholder } from '~/common/styles/mixins';

const styles = theme => ({
  form: {
    fontFamily: theme.typography.fontFamily,
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    right: 0,
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    margin: `0px ${theme.spacing.unit}px`,
    display: 'flex',
  },
  input: {
    flex: '1 1 auto',
    font: 'inherit',
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    '&:focus': {
      outline: 0,
    },
    ...placeholder({
      color: theme.palette.text.secondary,
    }),
  },
  searchButtonWrapper: {
    'text-align': 'right',
  },
});

class CollapsedAppSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      text: props.text || '',
    };
  }

  handleOpen() {
    this.setState({
      ...this.state,
      open: true,
    });
  }

  handleClose() {
    this.setState({
      ...this.state,
      open: false,
    });
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      text: e.target.value,
    });
  }

  handleClear() {
    this.setState({
      ...this.state,
      text: '',
    });
  }

  handleSearch(e) {
    e && e.preventDefault && e.preventDefault();
    if (this.state.text) this.props.onSearch(this.state.text);
  }

  renderSearchButton() {
    const { classes, className } = this.props;
    return (
      <div
        className={[
          classes.searchButtonWrapper,
          className ? className : '',
        ].join(' ')}
      >
        <IconButton color="contrast" onClick={() => this.handleOpen()}>
          <Search />
        </IconButton>
      </div>
    );
  }

  renderSearchInput() {
    const { classes, className } = this.props;
    const { text } = this.state;
    return (
      <form
        className={[classes.form, className ? className : ''].join(' ')}
        onSubmit={e => this.handleSearch(e)}
      >
        <IconButton
          className={classes.button}
          onClick={() => this.handleClose()}
        >
          <ArrowBack />
        </IconButton>
        <input
          className={classes.input}
          value={text}
          placeholder="Buscar"
          onChange={e => this.handleChange(e)}
        />
        {text.length ? (
          <IconButton
            className={classes.button}
            onClick={() => this.handleClear()}
          >
            <Clear />
          </IconButton>
        ) : (
          ''
        )}
      </form>
    );
  }

  render() {
    const { open } = this.state;
    return open ? this.renderSearchInput() : this.renderSearchButton();
  }
}

CollapsedAppSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
  text: PropTypes.string,
};

export default withStyles(styles)(CollapsedAppSearch);
