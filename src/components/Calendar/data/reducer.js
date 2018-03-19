import { Map, List, fromJS } from 'immutable';
import { Actions, ItemTypes } from './constants';
import moment from 'moment';

const initialState = Map({
  month: moment().format('MMMM YYYY'),
  appointmentModal: Map({
    date: moment().toDate(),
    isOpen: false
  }),
  appointments: Map({})
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.UPDATE_MONTH: {
      return state.set('month', action.month);
    }
    case Actions.CREATE_APPOINTMENT: {
      const {appointment} = action;
      const appointmentDate = moment(appointment.date).format('MM-DD-YYYY');
      return state.setIn(['appointments', appointmentDate], fromJS(appointment));
    }
    case Actions.DELETE_APPOINTMENT: {
      const {date} = action;
      return state.deleteIn(['appointments', moment(date).format('MM-DD-YYYY')]);
    }
    case Actions.SETUP_APPOINTMENT_MODAL: {
      const {date, appointment} = action;
      let nextState = state.setIn(['appointmentModal', 'date'], date);
      nextState = nextState.setIn(['appointmentModal', 'appointment'], appointment);
      return nextState.setIn(['appointmentModal', 'isOpen'], true);
    }
    case Actions.SHOW_APPOINTMENT_MODAL: {
      return state.setIn(['appointmentModal', 'isOpen'], true);
    }
    case Actions.HIDE_APPOINTMENT_MODAL: {
      return state.setIn(['appointmentModal', 'isOpen'], false);
    }
    default: {
      return state;
    }
  }
}
