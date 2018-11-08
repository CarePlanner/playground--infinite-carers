export const SELECT_CARER = 'SELECT_CARER';
export const DESELECT_CARER = 'DESELECT_CARER';
export const ADD_CARER_SLOT = 'ADD_CARER_SLOT';
export const REMOVE_CARER_SLOT = 'REMOVE_CARER_SLOT';

export const selectCarer = id => ({
  type: SELECT_CARER,
  payload: {
    id
  }
});

export const deselectCarer = id => ({
  type: SELECT_CARER,
  payload: {
    id
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
