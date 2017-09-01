import React from 'react';
import { connect } from 'react-redux';
import { setLoadedInitialData, dismissInitialData } from '../actions/initialData';

const getRouteId = r => r.path || r.key;

export default function connectWithSSR(mapStateToProps, mapDispatchToProps) {
  const mapStateToPropsIsFunction = typeof(mapStateToProps) === 'function';
  const mapDispatchToPropsIsFunction = typeof(mapDispatchToProps) === 'function';
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
      static getInitialData({dispatch, getState, route}) {
        console.log('getInitialData');
        if (!Page.getInitialData)
          return Promise.resolve(null);

        const props = {
          route,
        };
        if (mapStateToPropsIsFunction)
          Object.assign(props, mapStateToProps(getState()));

        if (mapDispatchToPropsIsFunction)
          Object.assign(props, mapDispatchToProps(dispatch));

        dispatch(setLoadedInitialData(getRouteId(route)));

        return Page.getInitialData(props);
      }

      componentDidMount() {
        if (!Page.getInitialData)
          return;

        const { __initialDataPages, route } = this.props;

        if (__initialDataPages.indexOf(getRouteId(route)) !== -1)
          return;

        console.log('fetch async!');
        Page.getInitialData(this.props);
      }

      componentWillUnmount() {
        if (!Page.getInitialData)
          return;

        const { __dismissInitialData, route } = this.props;
        __dismissInitialData(getRouteId(route));
      }

      render() {
        const { __initialDataPages, __dismissInitialData, ...props } = this.props;
        return (
          <Page {...props} />
        );
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
