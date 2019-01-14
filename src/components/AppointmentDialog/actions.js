export const SELECT_CARER = 'SELECT_CARER';
export const DESELECT_CARER = 'DESELECT_CARER';
export const ADD_CARER_SLOT = 'ADD_CARER_SLOT';
export const REMOVE_CARER_SLOT = 'REMOVE_CARER_SLOT';
export const SELECT_TRAVEL_METHOD = 'SELECT_TRAVEL_METHOD';
export const SELECT_SHADOWING_SUPERVISING = 'SELECT_SHADOWING_SUPERVISING';
export const SELECT_RUN = 'SELECT_RUN';
export const DESELECT_RUN = 'DESELECT_RUN';
export const RESET_STATE = 'RESET_STATE';

export const selectCarer = (position, carer) => ({
  type: SELECT_CARER,
  payload: {
    position,
    carer
  }
});

export const deselectCarer = (position, carer) => ({
  type: DESELECT_CARER,
  payload: {
    position,
    carer
  }
});

export const addCarerSlot = () => ({
  type: ADD_CARER_SLOT
});

export const removeCarerSlot = id => ({
  type: REMOVE_CARER_SLOT,
  payload: {
    id
  }
});

export const selectTravelMethod = (position, travelMethod) => ({
  type: SELECT_TRAVEL_METHOD,
  payload: {
    position,
    travelMethod
  }
});

export const selectShadowingSupervising = (position, shadowingSupervising) => ({
  type: SELECT_SHADOWING_SUPERVISING,
  payload: {
    position,
    shadowingSupervising
  }
});

export const selectRun = (position, run) => ({
  type: SELECT_RUN,
  payload: {
    position,
    run
  }
});

export const resetState = () => ({
  type: RESET_STATE,
  payload: {}
});
