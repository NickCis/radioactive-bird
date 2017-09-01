export const LOADED_INITAL_DATA = 'LOADED_INITAL_DATA';
export const DISMISS_INITAL_DATA = 'DISMISS_INITAL_DATA';

export const setLoadedInitialData = path => ({
  type: LOADED_INITAL_DATA,
  path,
});

export const dismissInitialData = path => ({
  type: DISMISS_INITAL_DATA,
  path,
});
