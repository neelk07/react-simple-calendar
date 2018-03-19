import moment from 'moment';

import { Actions, ItemTypes} from './constants';

export function updateMonth(newMonth) {
  return function(dispatch, getState) {
    dispatch({
      type: Actions.UPDATE_MONTH,
      month: newMonth
    });
  }
}

export function createAppointment(appointment) {
  return function(dispatch, getState) {
    dispatch({
      type: Actions.CREATE_APPOINTMENT,
      appointment: appointment
    });
  }
}

export function deleteAppointment(appointmentDate) {
  return function(dispatch, getState) {
    dispatch({
      type: Actions.DELETE_APPOINTMENT,
      date: appointmentDate
    });
  }
}

export function setupAppointmentModal(date, appointment) {
  return function(dispatch, getState) {
    dispatch({
      type: Actions.SETUP_APPOINTMENT_MODAL,
      date: date,
      appointment: appointment
    });
  }
}

export function showAppointmentModal() {
  return function(dispatch, getState) {
    dispatch({ type: Actions.SHOW_APPOINTMENT_MODAL });
  }
}

export function hideAppointmentModal(appointment) {
  return function(dispatch, getState) {
    dispatch({ type: Actions.HIDE_APPOINTMENT_MODAL });
  }
}
