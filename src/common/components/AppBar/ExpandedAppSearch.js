import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui-icons/Search';
import Clear from 'material-ui-icons/Clear';
import { fade } from 'material-ui/styles/colorManipulator';
import { withStyles } from 'material-ui/styles';
import { placeholder } from '~/common/styles/mixins';

const styles = theme => ({
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    borderRadius: 2,
    display: 'flex',
    background: fade(theme.palette.common.white, 0.15),
    margin: `0px 0px 0px ${theme.spacing.unit * 2}px`,
    transition: theme.transitions.create('background-color'),
    'max-width': '760px',
  },
  focus: {
    color: theme.palette.text.primary,
    background: theme.palette.common.white,
    '& $button': {
      color: theme.palette.text.primary,
    },
    '& $input': {
      ...placeholder({
        color: theme.palette.text.secondary,
      }),
    },
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
      color: theme.palette.common.white,
    }),
  },
  button: {
    height: 'auto',
    margin: theme.spacing.unit,
    color: theme.palette.common.white,
  },
});

class ExpandedAppSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focus: false,
      text: props.text || '',
    };
  }

  handleFocus() {
    this.setState({
      ...this.state,
      focus: true,
    });
  }

  handleBlur() {
    this.setState({
      ...this.state,
      focus: false,
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

  render() {
    const { classes, className } = this.props;
    const { focus, text } = this.state;
    return (
      <form
        className={[
          classes.wrapper,
          focus ? classes.focus : '',
          className ? className : '',
        ].join(' ')}
        onSubmit={e => this.handleSearch(e)}
      >
        <IconButton
          className={classes.button}
          onClick={() => this.handleSearch()}
        >
          <Search />
        </IconButton>
        <input
          onFocus={() => this.handleFocus()}
          onBlur={() => this.handleBlur()}
          value={text}
          className={classes.input}
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
}

ExpandedAppSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
  text: PropTypes.string,
};

export default withStyles(styles)(ExpandedAppSearch);
