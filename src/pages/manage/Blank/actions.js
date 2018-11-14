export const SET_CARERS = 'SET_CARERS';

export const setCarers = (carers) => ({
  type: SET_CARERS,
  payload: {
    carers
  }
});
