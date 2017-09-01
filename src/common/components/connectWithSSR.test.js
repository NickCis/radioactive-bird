import connectWithSSR, { getRouteId } from './connectWithSSR';

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
