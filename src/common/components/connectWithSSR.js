import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setLoadedInitialData,
  dismissInitialData,
} from '../actions/initialData';

export const getRouteId = (Page, route, match) => {
  if (Page.getRouteId) return Page.getRouteId({ route, match });

  if (route.key) return route.key;

  return [getDisplayName(Page), route.path, match.url].filter(e => e).join(' ');
};

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
          match: PropTypes.object.isRequired,
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

        dispatch(setLoadedInitialData(getRouteId(Page, route, match)));

        return Page.getInitialData(props);
      }

      fetchDataIfNeeded(nextProps) {
        if (!Page.getInitialData) return;
        const {
          __initialDataPages,
          __dismissInitialData, // eslint-disable-line no-unused-vars
          route,
          match,
          ...props
        } =
          nextProps || this.props;

        if (__initialDataPages.indexOf(getRouteId(Page, route, match)) !== -1)
          return;

        Page.getInitialData({
          route,
          match,
          ...props,
        });
      }

      componentDidMount() {
        this.fetchDataIfNeeded();
      }

      componentWillReceiveProps(nextProps) {
        if (!Page.getInitialData) return;

        const { route, match } = this.props;
        const { route: nextRoute, match: nextMatch } = nextProps;
        const key = getRouteId(Page, route, match);
        const nextKey = getRouteId(Page, nextRoute, nextMatch);

        if (key === nextKey) return;

        this.dismissInitialData();
        this.fetchDataIfNeeded(nextProps);
      }

      dismissInitialData() {
        if (!Page.getInitialData) return;

        const { __dismissInitialData, route, match } = this.props;
        __dismissInitialData(getRouteId(Page, route, match));
      }

      componentWillUnmount() {
        this.dismissInitialData();
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

    return withRouter(connect(_mapStateToProps, _mapDispatchToProps)(ReduxSSR));
  };
}

// react-dev-tools Component Name
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
