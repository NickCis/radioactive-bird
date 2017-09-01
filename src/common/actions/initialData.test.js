import * as actions from './initialData';

describe('initialData - Actions', () => {
  it('should create an action to set a loaded initial data', () => {
    const path = 'test';
    const expectedAction = {
      type: actions.LOADED_INITIAL_DATA,
      path,
    };

    expect(actions.setLoadedInitialData(path)).toEqual(expectedAction);
  });

  it('should create an action to dismiss a loaded initial data', () => {
    const path = 'test';
    const expectedAction = {
      type: actions.DISMISS_INITIAL_DATA,
      path,
    };

    expect(actions.dismissInitialData(path)).toEqual(expectedAction);
  });
});
