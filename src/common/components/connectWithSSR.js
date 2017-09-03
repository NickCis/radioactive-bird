import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setLoadedInitialData,
  dismissInitialData,
} from '../actions/initialData';

export const getRouteId = r =>
  r.key ||
  r.path ||
  (() => {
    throw new Error(
      'Routes must have either key or path in order to prevent double fetch!'
    );
  })();

export default function connectWithSSR(mapStateToProps, mapDispatchToProps) {
  const mapStateToPropsIsFunction = typeof mapStateToProps === 'function';
  const mapDispatchToPropsIsFunction = typeof mapDispatchToProps === 'function';
  const _mapStateToProps = state => ({
    ...(mapStateToPropsIsFunction ? mapStateToProps(state) : {}),
    __initialDataPages: state.initialData.pages,
  });

  const _mapDispatchToProps = dispatch => ({
    ...(mapDispatchToPropsIsFunction ? mapDispatchToProps(dispatch) : {}),
    __dismissInitialData: p => dispatch(dismissInitialData(p)),
  });

  return Page => {
    class ReduxSSR extends React.Component {
      static get propTypes() {
        return {
          route: PropTypes.object.isRequired,
          __initialDataPages: PropTypes.array.isRequired,
          __dismissInitialData: PropTypes.func.isRequired,
        };
      }

      static getInitialData({ dispatch, getState, route, match }) {
        if (!Page.getInitialData) return Promise.resolve(null);

        const props = {
          route,
          match,
        };
        if (mapStateToPropsIsFunction)
          Object.assign(props, mapStateToProps(getState()));

        if (mapDispatchToPropsIsFunction)
          Object.assign(props, mapDispatchToProps(dispatch));

        dispatch(setLoadedInitialData(getRouteId(route)));

        return Page.getInitialData(props);
      }

      componentDidMount() {
        if (!Page.getInitialData) return;

        const { __initialDataPages, route } = this.props;

        if (__initialDataPages.indexOf(getRouteId(route)) !== -1) return;

        Page.getInitialData(this.props);
      }

      componentWillUnmount() {
        if (!Page.getInitialData) return;

        const { __dismissInitialData, route } = this.props;
        __dismissInitialData(getRouteId(route));
      }

      render() {
        const {
          __initialDataPages, // eslint-disable-line no-unused-vars
          __dismissInitialData, // eslint-disable-line no-unused-vars
          ...props
        } = this.props;
        return <Page {...props} />;
      }
    }

    ReduxSSR.displayName = `SSR(${getDisplayName(Page)})`;

    return connect(_mapStateToProps, _mapDispatchToProps)(ReduxSSR);
  };
}

// react-dev-tools Component Name
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
