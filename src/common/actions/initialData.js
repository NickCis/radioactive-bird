export const LOADED_INITIAL_DATA = 'LOADED_INITAL_DATA';
export const DISMISS_INITIAL_DATA = 'DISMISS_INITAL_DATA';

export const setLoadedInitialData = path => ({
  type: LOADED_INITIAL_DATA,
  path,
});

export const dismissInitialData = path => ({
  type: DISMISS_INITIAL_DATA,
  path,
});
