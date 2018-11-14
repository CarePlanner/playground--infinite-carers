import { combineReducers } from 'redux';
import appointmentDialogReducer from '../../src/components/AppointmentDialog/reducers';
import blankManagePageReducer from '../../src/pages/manage/Blank/reducers';

export default combineReducers({
  blankManagePageReducer,
  appointmentDialogReducer
});
