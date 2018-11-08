import {
  SELECT_CARER,
  DESELECT_CARER,
  ADD_CARER_SLOT,
  REMOVE_CARER_SLOT
} from './actions';

const initialState = {
  carerSlots: [
    {}
  ]
};

function selectCarer(state, action) {

}

function deselectCarer(state, action) {

}

function addCarerSlot(state, action) {
  let { carerSlots } = state;

  carerSlots.push({});

  return { ...state, carerSlots };
}

function removeCarerSlot(state, action) {

}

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CARER:
      return selectCarer(state, action);
    case DESELECT_CARER:
      return deselectCarer(state, action);
    case ADD_CARER_SLOT:
      return addCarerSlot(state, action);
    case REMOVE_CARER_SLOT:
      return removeCarerSlot(state, action);
    default:
      return state;
  }
};
