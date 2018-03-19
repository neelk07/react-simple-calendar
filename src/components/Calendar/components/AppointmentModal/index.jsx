import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIn } from 'immutable';
import { flow } from 'lodash';
import moment from 'moment';

import * as actions from '../../data/actions';
import './styles.css';

class AppointmentModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: ''
    }
  }

  createAppointment = () => {
    this.props.createAppointment({
      date: this.props.appointmentModal.get('date'),
      description: this.state.description
    });
    this.props.hideAppointmentModal();
  }

  deleteAppointment = (date) => {
    this.props.deleteAppointment(date);
    this.props.hideAppointmentModal();
  }

  render() {
    const {appointmentModal} = this.props;
    const date = appointmentModal.get('date');
    const appointment = appointmentModal.get('appointment');

    return (
      <div className="AppointmentModal">
        <form className="AppointmentModal-appointment-form">
          {appointment ?
            (<div>
               <h4>Edit Appointment</h4>
               <label>Date</label>
               <p>{moment(date).format('MMMM Do, YYYY')}</p>
               <label for="appointmentDetails">Details</label>
               <textarea className="u-full-width"
                 placeholder="Interview at ReviewTrackers..."
                 id="appointmentDetails"
                 defaultValue={appointment.get('description')}
                 onChange={event => this.setState({ description: event.target.value })}
                >
               </textarea>
               <div className="AppointmentModal-appointment-buttons">
                 <button className="button-primary"
                   onClick={() => this.createAppointment()}>
                   Save Changes
                 </button>
                 <button className="button-primary delete"
                   onClick={() => this.deleteAppointment(date)}>
                   Delete
                 </button>
               </div>
            </div>)
              :
            (<div>
              <h4>Create Appointment</h4>
              <label>Date</label>
              <p>{moment(date).format('MMMM Do, YYYY')}</p>
              <label for="appointmentDetails">Details</label>
              <textarea className="u-full-width"
                placeholder="Interview at ReviewTrackers..."
                id="appointmentDetails"
                onChange={event => this.setState({ description: event.target.value })}
               >
              </textarea>
              <button className="button-primary"
                onClick={() => this.createAppointment()}>
                Create Appointment
              </button>
            </div>)
          }
          </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    appointmentModal: state.getIn(['calendar', 'appointmentModal'])
  }
}

export default flow(
	connect(mapStateToProps, actions)
)(AppointmentModal);
