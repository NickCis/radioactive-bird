import connectWithSSR, { getRouteId } from './connectWithSSR';
import configureMockStore from 'redux-mock-store'
import { setLoadedInitialData } from '../actions/initialData';

describe('getRouteId', () => {
  it('shoud use `key` as the first option', () => {
    expect(getRouteId({key: 'key', path: '/'}))
      .toEqual('key');
  });
  it('should use `path` as the second option', () => {
    expect(getRouteId({path: '/'}))
      .toEqual('/');
  });
  it('should throw error it there are no `key` or `path`', () => {
    expect(() => getRouteId({}))
      .toThrow();
  });
});

describe('connectWithSSR', () => {
  const mockStore = configureMockStore();

  it('should get initial data in SSR', () => {
    let isGetInitialDataCalled = false;
    const component = () => {};
    component.getInitialData = () => {
      isGetInitialDataCalled = true;
      return Promise.resolve(true);
    };

    const store = mockStore({ initialData: { pages: [], }, });

    const hocComponent = connectWithSSR()(component);

    hocComponent.getInitialData({
      dispatch: d => store.dispatch(d),
      getState: () => store.getState(),
      route: { key: 'test', },
    });

    expect(isGetInitialDataCalled).toBeTruthy();
    expect(store.getActions()).toEqual([setLoadedInitialData('test')]);
  });

  it('should get initial data in web', () => {
    // TODO
  });

  it('should not double fetch', () => {
    // TODO
  });
});
