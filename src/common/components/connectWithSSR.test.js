import connectWithSSR, { getRouteId } from './connectWithSSR';
import configureMockStore from 'redux-mock-store';
import { setLoadedInitialData, dismissInitialData } from '../actions/initialData';
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

describe('getRouteId', () => {
  it('shoud use `key` as the first option', () => {
    expect(getRouteId({ key: 'key', path: '/' })).toEqual('key');
  });
  it('should use `path` as the second option', () => {
    expect(getRouteId({ path: '/' })).toEqual('/');
  });
  it('should throw error it there are no `key` or `path`', () => {
    expect(() => getRouteId({})).toThrow();
  });
});

describe('connectWithSSR', () => {
  const mockStore = configureMockStore();
  const setup = () => {
    const Component = jest.fn().mockReturnValue(null);
    Component.getInitialData = jest.fn().mockReturnValue(Promise.resolve());
    return Component;
  }

  it('should get initial data in SSR', () => {
    const Component = setup();
    const store = mockStore({ initialData: { pages: [] } });
    const HocComponent = connectWithSSR()(Component);

    HocComponent.getInitialData({
      dispatch: d => store.dispatch(d),
      getState: () => store.getState(),
      route: { key: 'test' },
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
        <HocComponent route={{key: 'test'}}/>
      </Provider>
    );

    expect(Component.getInitialData.mock.calls.length).toBe(1);
  });

  it('should call getInitialData on web if the data was brought in SSR (no double fetch)', () => {
    const Component = setup();
    const store = mockStore({ initialData: { pages: ['test'] } });
    const HocComponent = connectWithSSR()(Component);

    mount(
      <Provider store={store}>
        <HocComponent route={{key: 'test'}}/>
      </Provider>
    );

    expect(Component.getInitialData.mock.calls.length).toBe(0);
  });

  it('should dissmiss get initial data when unmounting', () => {
    const store = mockStore({ initialData: { pages: ['test'] } });
    const HocComponent = connectWithSSR()(setup());

    const wrapper = mount(
      <Provider store={store}>
        <HocComponent route={{key: 'test'}}/>
      </Provider>
    );

    wrapper.unmount();
    expect(store.getActions()).toEqual([dismissInitialData('test')]);
  });
});
