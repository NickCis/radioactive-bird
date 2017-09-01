import reducer from './initialData';
import {
  LOADED_INITIAL_DATA,
  DISMISS_INITIAL_DATA,
} from '../actions/initialData';

describe('initialData - reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      pages: [],
    });
  });

  it('should handle LOADED_INITIAL_DATA', () => {
    expect(
      reducer(undefined, {
        type: LOADED_INITIAL_DATA,
        path: 'test',
      })
    ).toEqual({
      pages: ['test'],
    });
  });

  it('should handle DISMISS_INITIAL_DATA', () => {
    expect(
      reducer(
        { pages: ['test'] },
        {
          type: DISMISS_INITIAL_DATA,
          path: 'test',
        }
      )
    ).toEqual({
      pages: [],
    });
  });
});
