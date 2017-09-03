import api from './index';
import searchStubResponse from './searchStubResponse';

describe('/search/:query - endpoint', () => {
  it('should return valid response', () => {
    return new Promise(rs => {
      api(
        { method: 'GET', url: '/search/test' },
        {
          json: json => {
            expect(json).toEqual(searchStubResponse);
            rs();
          },
        }
      );
    });
  });
});
