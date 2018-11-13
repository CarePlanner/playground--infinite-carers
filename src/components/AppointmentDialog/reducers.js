import {
  SELECT_CARER,
  DESELECT_CARER,
  ADD_CARER_SLOT,
  REMOVE_CARER_SLOT,
  SELECT_TRAVEL_METHOD,
  SELECT_SHADOWING_SUPERVISING,
  SELECT_RUN
} from './actions';

let id = 1;

const initialState = {
  carerSlots: [newSlot()],
  selectedCarers: [],
  selectedRuns: []
};

function newSlot() {
  id++;
  return {
    id,
    carer: null,
    travelMethod: 0,
    shadowingSupervising: 0,
    run: 0
  };
}

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

  carerSlots = [...carerSlots, newSlot()];

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

function selectTravelMethod(state, action) {
  let { carerSlots } = state;

  const { travelMethod, position } = action.payload;

  carerSlots[position].travelMethod = travelMethod;

  return { ...state, carerSlots };
}

function selectShadowingSupervising(state, action) {
  let { carerSlots } = state;

  const { shadowingSupervising, position } = action.payload;

  carerSlots[position].shadowingSupervising = shadowingSupervising;

  return { ...state, carerSlots };
}

function selectRun(state, action) {
  let { carerSlots, selectedRuns } = state;

  const { run, position } = action.payload;

  carerSlots[position].run = run;

  return { ...state, carerSlots, selectedRuns };
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
    case SELECT_TRAVEL_METHOD:
      return selectTravelMethod(state, action);
    case SELECT_SHADOWING_SUPERVISING:
      return selectShadowingSupervising(state, action);
    case SELECT_RUN:
      return selectRun(state, action);
    default:
      return state;
  }
};
