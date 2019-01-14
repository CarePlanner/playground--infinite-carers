import {
  SET_CARERS
} from './actions';

const initialState = {
  allCarers: [],
  client: {
    name: 'Amelie Gibson'
  }
};

function setCarers(state, action) {
  let { allCarers } = state;

  const { carers } = action.payload;

  return { ...state, allCarers: carers };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CARERS:
      return setCarers(state, action);
    default:
      return state;
  }
};
