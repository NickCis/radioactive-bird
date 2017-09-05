import connectWithSSR, { getRouteId } from './connectWithSSR';
import configureMockStore from 'redux-mock-store';
import {
  setLoadedInitialData,
  dismissInitialData,
} from '../actions/initialData';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { mount } from 'enzyme';

const setUpStepper = steps => {
  class Stepper extends React.Component {
    componentDidMount() {
      this.next();
    }

    componentDidUpdate() {
      this.next();
    }

    next() {
      const nextStep = steps.shift();
      if (nextStep)
        nextStep(this.props);
    }

    render() {
      return renderRoutes(this.props.route.routes);
    }
  }

  return Stepper;
}

describe('getRouteId', () => {
  it('shoud call `Page.getRouteId` as the first option', () => {
    const Page = { getRouteId: jest.fn().mockReturnValue('test') };
    expect(getRouteId(Page, {}, {})).toEqual('test');
    expect(Page.getRouteId.mock.calls.length).toBe(1);
  });

  it('shoud use `key` as the second option', () => {
    expect(getRouteId({}, { key: 'key', path: '/' }, {})).toEqual('key');
  });

  it('should use build a complex key', () => {
    expect(getRouteId({}, { path: '/' }, { url: 'test' })).toEqual(
      'Component / test'
    );
  });
});

describe('connectWithSSR', () => {
  const mockStore = configureMockStore();
  const setup = c => {
    const Component = c || jest.fn().mockReturnValue(null);
    Component.getInitialData = jest.fn().mockReturnValue(Promise.resolve());
    return Component;
  };

  it('should get initial data in SSR', () => {
    const Component = setup();
    const store = mockStore({ initialData: { pages: [] } });
    const HocComponent = connectWithSSR()(Component);

    HocComponent.getInitialData({
      dispatch: d => store.dispatch(d),
      getState: () => store.getState(),
      route: { key: 'test' },
      match: { url: 'test' },
    });

    expect(Component.getInitialData.mock.calls.length).toBe(1);
    expect(store.getActions()).toEqual([setLoadedInitialData('test')]);
  });

  it('should get initial data in web', () => {
    const Component = setup();
    const store = mockStore({ initialData: { pages: [] } });
    const HocComponent = connectWithSSR()(Component);

    mount(
      <Provider store={store}>
        <Router>
          <HocComponent route={{ key: 'test' }} match={{ url: 'test' }} />
        </Router>
      </Provider>
    );

    expect(Component.getInitialData.mock.calls.length).toBe(1);
  });

  it('should not call getInitialData on web if the data was brought in SSR (no double fetch)', () => {
    const Component = setup();
    const store = mockStore({ initialData: { pages: ['test'] } });
    const HocComponent = connectWithSSR()(Component);

    mount(
      <Provider store={store}>
        <Router>
          <HocComponent route={{ key: 'test' }} match={{ url: 'test' }} />
        </Router>
      </Provider>
    );

    expect(Component.getInitialData.mock.calls.length).toBe(0);
  });

  it('should dissmiss get initial data when unmounting', () => {
    const store = mockStore({ initialData: { pages: ['test'] } });
    const HocComponent = connectWithSSR()(setup());

    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <HocComponent route={{ key: 'test' }} match={{ url: 'test' }} />
        </Router>
      </Provider>
    );

    wrapper.unmount();
    expect(store.getActions()).toEqual([dismissInitialData('test')]);
  });

  it('should not call getInitialData on web if changed props create same key (no double fetch)', done => {
    const steps = [
      ({history}) => history.push('/test/1'),
      ({history}) => history.push('/test/1'),
      () => {
        expect(Component.getInitialData.mock.calls.length).toBe(1);
        expect(Component.getInitialData.mock.calls[0][0]).toMatchObject({
          match: {
            url: '/test/1',
          },
          route: {
            path: '/test/:id',
          },
        });
        done();
      },
    ];

    const Component = setup();
    const HocComponent = connectWithSSR()(Component);
    const routes = [
      {
        component: setUpStepper(steps),
        routes: [
          {
            component: HocComponent,
            path: '/test/:id',
          },
        ],
      },
    ];

    const store = mockStore({ initialData: { pages: [] } });
    mount(
      <Provider store={store}>
        <Router>
          {renderRoutes(routes)}
        </Router>
      </Provider>
    );
  });

  it('should call getInitialData on web if changed props create diferent key', done => {
    const steps = [
      ({history}) => history.push('/test/1'),
      ({history}) => history.push('/test/2'),
      () => {
        expect(Component.getInitialData.mock.calls.length).toBe(2);
        expect(Component.getInitialData.mock.calls[0][0]).toMatchObject({
          match: {
            url: '/test/1',
          },
          route: {
            path: '/test/:id',
          },
        });
        expect(Component.getInitialData.mock.calls[1][0]).toMatchObject({
          match: {
            url: '/test/2',
          },
          route: {
            path: '/test/:id',
          },
        });
        done();
      }
    ];

    const Component = setup();
    const HocComponent = connectWithSSR()(Component);
    const routes = [
      {
        component: setUpStepper(steps),
        routes: [
          {
            component: HocComponent,
            path: '/test/:id',
          },
        ],
      },
    ];

    const store = mockStore({ initialData: { pages: [] } });
    mount(
      <Provider store={store}>
        <Router>
          {renderRoutes(routes)}
        </Router>
      </Provider>
    );
  });
});
