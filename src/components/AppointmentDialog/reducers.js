import {
  SELECT_CARER,
  DESELECT_CARER,
  ADD_CARER_SLOT,
  REMOVE_CARER_SLOT
} from './actions';

const initialState = {
  carerSlots: [{ id: 1, carer: null}],
  selectedCarers: []
};

let id = 1;

function selectCarer(state, action) {
  let { carerSlots, selectedCarers } = state;

  const { carer, position } = action.payload;

  const currentSelectedCarer = carerSlots[position].carer;

  if(currentSelectedCarer !== null) {
    selectedCarers = selectedCarers.filter((selectedCarer) => (selectedCarer.id !== currentSelectedCarer.id));
  }

  carerSlots[position].carer = carer;
  selectedCarers = [...selectedCarers, carer];

  return { ...state, carerSlots, selectedCarers };
}

function deselectCarer(state, action) {
  let { carerSlots, selectedCarers } = state;

  const { carer, position } = action.payload;

  carerSlots[position].carer = null;
  selectedCarers = selectedCarers.filter((selectedCarer) => (selectedCarer.id !== carer.id));

  return { ...state, carerSlots, selectedCarers };
}

function addCarerSlot(state, action) {
  let { carerSlots } = state;

  id++;

  carerSlots = [...carerSlots, { id, carer: null }];

  return { ...state, carerSlots };
}

function removeCarerSlot(state, action) {
  let { carerSlots, selectedCarers } = state;

  const { id } = action.payload;
  let carerInSlot = null;

  carerSlots = carerSlots.filter((carerSlot, i) => {
    if(carerSlot.id === id) {
      carerInSlot = carerSlot.carer;
    }
    return carerSlot.id !== id;
  });

  if(carerInSlot !== null) {
    selectedCarers = selectedCarers.filter((selectedCarer) => (selectedCarer.id !== carerInSlot.id));
  }

  return { ...state, carerSlots, selectedCarers };
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
