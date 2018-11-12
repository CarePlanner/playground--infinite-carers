import {
  SELECT_CARER,
  DESELECT_CARER,
  ADD_CARER_SLOT,
  REMOVE_CARER_SLOT
} from './actions';

const initialState = {
  carerSlots: [
    {
      id: 1,
      carer: null
    }
  ]
};

let id = 1;

function selectCarer(state, action) {
  let { carerSlots } = state;

  const { carer, position } = action.payload;

  carerSlots[position].carer = carer;

  return { ...state, carerSlots };
}

function deselectCarer(state, action) {
  let { carerSlots } = state;

  const { carer, position } = action.payload;

  carerSlots[position].carer = null;

  return { ...state, carerSlots };
}

function addCarerSlot(state, action) {
  let { carerSlots } = state;

  id++;

  carerSlots.push({
    id: id,
    carer: null
  });

  return { ...state, carerSlots };
}

function removeCarerSlot(state, action) {
  let { carerSlots } = state;

  const { id } = action.payload;

  carerSlots = carerSlots.filter((carerSlot, i) => (carerSlot.id !== id));

  return { ...state, carerSlots };
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
