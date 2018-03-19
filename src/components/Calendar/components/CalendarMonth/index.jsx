import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIn } from 'immutable';
import { flow } from 'lodash';
import moment from 'moment';
import Modal from 'react-modal';

import CalendarDay from '../CalendarDay';
import AppointmentModal from '../AppointmentModal';
import * as actions from '../../data/actions';
import './styles.css';

const modalStyles = {
  content : {
    width:      'fit-content',
    minWidth:   '360px',
    height:     'fit-content',
    left:       '0',
    right:      '0',
    margin:     'auto',
  }
};

class CalendarMonth extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  setupAppointmentModal = (date) => {
    const {setupAppointmentModal, appointments} = this.props;
    let appointmentKey = moment(date).format('MM-DD-YYYY');
    const appointment = appointments.get(appointmentKey);
    this.props.setupAppointmentModal(date, appointment);
  }

  closeAppointmentModal = (date) => {
    this.props.hideAppointmentModal();
  }

  render() {
    const {month} = this.props;
    let days = [];

    let startDate = moment(month).startOf('month');

    const offsetWidthStyle = `calc(96%/7 * ${startDate.isoWeekday()})`;
    const offsetMarginStyle = startDate.isoWeekday() * 4;

    while (!startDate.isSame(moment(month).endOf('month').add(1, 'day'), 'day')) {
      days.push(<CalendarDay
        id={`day-${startDate.format('MM-DD-YYYY')}`}
        key={`day-${startDate.format('MM-DD-YYYY')}`}
        date={startDate.toDate()}
        appointment={this.props.appointments.get(startDate.format('MM-DD-YYYY'))}
        showAppointmentModal={this.setupAppointmentModal}
        />);
      startDate.add(1, 'day');
    }

    return (
      <div className="CalendarMonth">
        <div className="CalendarMonth-offset" style={{width: offsetWidthStyle, marginRight:`${offsetMarginStyle}px`}}></div>
        {days}
        <Modal
          style={modalStyles}
          isOpen={this.props.appointmentModal.get('isOpen')}
          contentLabel="Create Appointment Modal"
          ariaHideApp={false}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.closeAppointmentModal}
        >
          <AppointmentModal/>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    month: state.getIn(['calendar', 'month']),
    appointments: state.getIn(['calendar', 'appointments']),
    appointmentModal: state.getIn(['calendar', 'appointmentModal'])
	}
}

export default flow(
	connect(mapStateToProps, actions)
)(CalendarMonth);
